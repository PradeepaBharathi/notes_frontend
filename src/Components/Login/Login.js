import React, { useState } from "react";
import note from "../../icons/note-image.jpg";
import "./myStyles.css";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../Context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const { loginUser } = useGlobalContext();
  const loginUserid = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      console.log(response.data.data);
         localStorage.setItem("token", response.data.token);
      toast.success("Login successful!");
      setMsg("Login Successfull");
      navigate("header");
    } catch (error) {
      console.log(error.response);
      if ((error.response.data.message = "Invalid Email")) {
        toast.error("Login failed. Email doesn't exist.");
        setMsg("Invalid email.");
      } else {
        toast.error("Login failed. Please check your credentials.");
        setMsg("Incorrect email or password.");
      }
    }
  };
  const handleSignup = () => {
    navigate("/signup");
  };
  return (
    <div>
      <h1>MEMORANDUM</h1>
      <div className="login">
        <img src={note} className="login-img" alt="note" />
        <div className="login-box">
          <h3 className="login-header">Login to Make notes</h3>
          <div className="login-content">
            <TextField
              id="outlined-basic"
              label="Enter your email address"
              variant="outlined"
              value={email}
             
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              id="outlined-password-input"
              label="Enter Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="login-button" onClick={(e) => loginUserid(e)}>
              Login
            </button>
            <Typography id="text" variant="h5">
              OR
            </Typography>

            <button className="signup-button" onClick={handleSignup}>
              Create An Account
            </button>
            {msg && <p id="error-message">{msg}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
