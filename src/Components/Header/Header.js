import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import HomePage from "../Home/HomePage";
import NightlightIcon from "@mui/icons-material/Nightlight";
import LightModeIcon from "@mui/icons-material/LightMode";
import "./header.css";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../Features/ThemeSlice";
function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.themeKey);
   document.body.style.backgroundColor = lightTheme ? "#eff8a5" : "#2d3941";
  const onLogout = () => {
      localStorage.removeItem("token")
    }
    // Check if the current route is "/header/home"
    const isHomePage = location.pathname === "/header";
  return (
    <div className="header">
      <div>
        <AppBar className="app-bar">
          <Toolbar className={"tool-bar" + (lightTheme ? "" : " dark")}>
            <Link
              to="/header/home"
              className={`link ${lightTheme ? "" : "dark"}`}
            >
              Home
            </Link>
            <Link
              to="/header/create-note"
              className={`link ${lightTheme ? "" : "dark"}`}
            >
              Create-Note
            </Link>
            <Link
              to="/header/all-notes"
              className={`link ${lightTheme ? "" : "dark"}`}
            >
              All-Notes
            </Link>
            <IconButton
              onClick={() => {
                dispatch(toggleTheme());
              }}
            >
              {lightTheme && (
                <NightlightIcon
                  className={"icon" + (lightTheme ? "" : " dark")}
                />
              )}
              {!lightTheme && (
                <LightModeIcon
                  className={"icon" + (lightTheme ? "" : " dark")}
                />
              )}
            </IconButton>
            <Link
              to="/"
              className={`logout ${lightTheme ? "" : "dark"}`}
              onClick={onLogout}
            >
              Logout
            </Link>
          </Toolbar>
        </AppBar>
      </div>
      {isHomePage && <HomePage />}
      <Outlet />
    </div>
  );
}

export default Header;
