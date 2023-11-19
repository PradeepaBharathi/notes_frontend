import React, { useState } from 'react'
import './addNote.css'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import bg from '../../icons/note.png'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../Context';
function AddNote() {
   const { createNote } = useGlobalContext();
  const navigate = useNavigate()
   const [message, setMessage] = useState("");
   const [inputs, setInputs] = useState({
     title: "",
     description: "",
     date: "",
   });
   // input change
   const handleChange = (e) => {
     setInputs((prevState) => ({
       ...prevState,
       [e.target.name]: e.target.value,
     }));
  };
  
   const createNotes = async (e) => {
     e.preventDefault();
     try {
       const response = await createNote(
         inputs.title,
         inputs.description,
         inputs.date
       );
       console.log(response.data.data);

       toast.success("note created");
       setMessage("note created");
       navigate("/header/all-notes");
     } catch (error) {
       console.log(error.response);
       if ((error.response.data.message === "Please fill all fields")) {
         toast.error("Please fill all fields.");
         setMessage("Please fill all fields.");
       } else {
         toast.error("Note not created try again");
         setMessage("Note not created try again.");
       }
     }
   };
  return (
    <div className="addNote">
      <img src={bg} className="login-img" alt="note" />
      <div className="login-box">
        <h3 className="login-header">Add notes</h3>
        <div className="login-content">
          <TextField
            id="outlined-basic"
            label="Enter your Title"
            variant="outlined"
            required
            name="title"
            value={inputs.title}
            onChange={handleChange}
          />
          <TextField
            label="Enter Description"
            type="text"
            required
            name="description"
            value={inputs.description}
            onChange={handleChange}
          />
          <TextField
            type="date"
            required name="date"
            value={inputs.date}
            onChange={handleChange}
          />
          <button className="login-button" onClick={createNotes}>
            Create Note
          </button>
          {message && <p id="error-message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default AddNote