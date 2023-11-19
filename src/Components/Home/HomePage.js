import React from 'react'
import "./home.css"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
function HomePage() {
  const navigate = useNavigate()
   
   const lightTheme = useSelector((state) => state.themeKey);
  const handleNavigate = () => {
    navigate("/header/create-note")
  }
  return (
    <div className={"home-container" + (lightTheme ? "" : " dark")}>
      <h3> Hi User</h3>
      <p className={(lightTheme ? "" : " dark")}>
        "Capture your thoughts in a digital bottle with a click – because great
        ideas shouldn't slip through the cracks!"
      </p>
      <button className="note-button" onClick={handleNavigate}>
        Create a Note
      </button>
    </div>
  );
}

export default HomePage