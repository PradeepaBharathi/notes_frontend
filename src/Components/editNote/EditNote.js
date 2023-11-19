import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import bgx from "../../icons/note-image.jpg"
import'./edit.css'
import { useGlobalContext } from '../../Context';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
function EditNote() {
    const [message, setMessage] = useState("")
  const Base_URL = "https://backendnote-jy9w.onrender.com";
  const lightTheme = useSelector((state) => state.themeKey);
   const { id } = useParams();
   const navigate = useNavigate();
   
   const [noteData, setNoteData] = useState({
     title: "",
     description: "",
     date: "",
   });

   useEffect(() => {
     fetchNoteDetails();
   }, []);

   const fetchNoteDetails = async () => {
     try {
       const response = await axios.get(`${Base_URL}/notes/${id}`, {
         headers: {
           "x-auth-token": localStorage.getItem("token"),
         },
       });
       const { title, description, date } = response.data.data;
       setNoteData({ title, description, date });
     } catch (error) {
       console.log(error);
     }
   };

   const handleInputChange = (e) => {
     const { name, value } = e.target;
     setNoteData((prevData) => ({
       ...prevData,
       [name]: value,
     }));
   };

   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       const result = await axios.put(
         `${Base_URL}/edit-notes/${id}`,

         {
           title: noteData.title,
           description: noteData.description,
           date: noteData.date,
         },
         {
           headers: {
             "x-auth-token": localStorage.getItem("token"),
           },
         }
       );
       if (result.status === 200) {
        toast.success("note updated")
         navigate("/header/all-notes");
       }
     } catch (error) {
       console.log(error);
     }
   };
    return (
      <div className={"addNote" + (lightTheme ? "" : " dark")}>
        <img
          src={bgx}
          className={"login-img" + +(lightTheme ? "" : " dark")}
          alt="note"
        />
        <div className={"login-box" + (lightTheme ? "" : " dark")}>
          <h3 className={"login-header" + (lightTheme ? "" : " dark")}>
            Edit notes
          </h3>
          <div className={"login-content" + (lightTheme ? "" : " dark")}>
            <TextField
              id="outlined-basic"
              label="Enter your Title"
              variant="outlined"
              required
              name="title"
              className={lightTheme ? "" : " dark"}
              value={noteData.title || ""}
              onChange={handleInputChange}
            />
            <TextField
              label="Enter Description"
              type="text"
              required
              name="description"
              className={lightTheme ? "" : " dark"}
              value={noteData.description || ""}
              onChange={handleInputChange}
            />
            <TextField
              type="date"
              required
              name="date"
              className={lightTheme ? "" : " dark"}
              value={noteData.date || ""}
              onChange={handleInputChange}
            />
            <button className="login-button" onClick={handleSubmit}>
              Edit Note
            </button>
            {message && <p id="error-message">{message}</p>}
          </div>
        </div>
      </div>
    );
}

export default EditNote