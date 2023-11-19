import React, { useState } from "react";
import note from "../../icons/note-image.jpg";
import "./myStyles.css";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../Context";
import { toast } from "react-toastify";
function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [msg, setMsg] = useState("");
  const { addUser, setErrorMessage } = useGlobalContext();

  const signupUser = async (e) => {
    e.preventDefault();
    try {
      if (password !== cpassword) {
        toast.error("Password and confirm password do not match.");
        setMsg("Password and confirm password do not match.");
        return;
      }
      const response = await addUser(name, email, password, cpassword);

      console.log(response.data);

      toast.success("Registration successful!");
      setMsg("Registration Successfull");
      navigate("/");
    } catch (error) {
      console.log(error.response);
      if ((error.response.data.message = "Email already exist")) {
        toast.error("Email already exists. Please use a different email.");
        setMsg("Email already exists. Please use a different email.");
      } else {
        toast.error("Registration failed. Please check your credentials.");
        setMsg("Please try again.");
      }
    }
  };

  const handleLogin = () => {
    navigate("/");
  };
  return (
    <div>
      <h1>MEMORANDUM</h1>
      <div className="login">
        <img src={note} className="login-img" alt="note" />
        <div className="login-box">
          <h3 className="login-header">New to App Please Signin</h3>
          <div className="login-content">
            <TextField
              id="outlined-basic"
              label="Enter your Name"
              variant="outlined"
              className="textfield"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              id="outlined-basic"
              label="Enter your email address"
              variant="outlined"
              className="textfield"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              id="outlined-password-input"
              label="Enter Password"
              type="password"
              autoComplete="current-password"
              className="textfield"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              id="outlined-password-input"
              label=" Confirm Password"
              type="password"
              autoComplete="current-password"
              className="textfield"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
              required
            />
            <button className="login-button" onClick={(e) => signupUser(e)}>
              SignUp
            </button>
            <Typography id="text" variant="h5">
              OR
            </Typography>

            <button className="signup-button" onClick={handleLogin}>
              Already have an Account, Login
            </button>
            {msg && <p id="error-message">{msg}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
