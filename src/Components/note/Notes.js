import React from "react";
import { useState, useEffect } from "react";
import AllBlogs from "../myNotes/MyNotes";
import { useGlobalContext } from "../../Context";
import'./note.css'
import { IconButton } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Note() {
  const navigate=useNavigate()
  const { getAllNotes, getNotesByName, note } = useGlobalContext();
   const lightTheme = useSelector((state) => state.themeKey);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getAllNotes();
  }, []);

 
     const handleSearch = async () => {
      try {
        const response = await getNotesByName(searchTerm);
        setSearchResults(response.data.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
  return (
    <div className={"note" + (lightTheme ? "" : " dark")}>
      <div className={"sb-search" + (lightTheme ? "" : " dark")}>
        <IconButton onClick={handleSearch}>
          <SearchIcon />
          <input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </IconButton>
      </div>
      <div className={"note-container" + (lightTheme ? "" : " dark")}>
        {searchResults.length > 0 ? (
          searchResults.map((notes) => (
            <AllBlogs
              key={notes._id}
              id={notes._id}
              title={notes.title}
              description={notes.description}
              date={notes.date}
              createdAt={notes.createdAt}
            />
          ))
        ) : note && note.length > 0 ? (
          note.map((notes) => (
            <AllBlogs
              key={notes._id}
              id={notes._id}
              title={notes.title}
              description={notes.description}
              date={notes.date}
              createdAt={notes.createdAt}
            />
          ))
        ) : (
          <h1>No notes found</h1>
        )}
      </div>
      
    </div>
  );
}

export default Note;
