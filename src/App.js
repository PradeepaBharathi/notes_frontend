import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login"
import Signup from "./Components/Login/Signup";
import { ToastContainer } from "react-toastify";
import HomePage from "./Components/Home/HomePage";
import Header from "./Components/Header/Header";
import AddNote from "./Components/addNote/AddNote";
import MyNotes from "./Components/myNotes/MyNotes";
import Note from "./Components/note/Notes";
import EditNote from "./Components/editNote/EditNote";
import { useSelector } from "react-redux";

function App() {
   const lightTheme = useSelector((state) => state.themeKey);
  return (
    <div className={"App" + (lightTheme ? "" : " dark")}>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="header" element={<Header />}>
          <Route path="home" element={<HomePage />}></Route>
          <Route path="create-note" element={<AddNote />}></Route>
          <Route path="all-notes" element={<Note />}></Route>
          <Route path="edit-note/:id" element={<EditNote />}></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
