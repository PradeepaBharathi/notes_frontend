import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './mynote.css'
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function AllBlog({
  title,
  description,
  date,
  createdAt,
  id
  
}) {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);
   const lightTheme = useSelector((state) => state.themeKey);
  const Base_URL = "http://localhost:9000";
  const handleEdit = () => {
    navigate(`/header/edit-note/${id}`);
  };

   const handleOpenDelete = () => {
     setOpenDialog(true);
   };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${Base_URL}/delete/${id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      if (response) {
        toast.error("Note Deleted");
        navigate("/header/all-notes");
      }
    } catch (error) {
      console.error("Error deleting the blog:", error);
    }
    finally {
      setOpenDialog(false)
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }
  return (
    <Card
      className={"individual-blog" + (lightTheme ? "" : " dark")}
      sx={{ maxWidth: 345, marginBottom: "10px" }}
    >
      <Box display={"flex"}>
        <IconButton
          onClick={handleEdit}
          sx={{ marginLeft: "auto" }}
          className={lightTheme ? "" : " dark"}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={handleOpenDelete}
          className={lightTheme ? "" : " dark"}
        >
          <DeleteOutlineIcon />
        </IconButton>
      </Box>

      <CardHeader
        title={title}
        subheader={createdAt}
        className={"card-header" + (lightTheme ? "" : " dark")}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          fontFamily={"Georgia"}
          fontStyle={"italic"}
          className={lightTheme ? "" : " dark"}
        >
          Title : {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          fontFamily={"Georgia"}
          fontStyle={"italic"}
          className={lightTheme ? "" : " dark"}
        >
          Description :{description}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          fontFamily={"Georgia"}
          fontStyle={"italic"}
          className={lightTheme ? "" : " dark"}
        >
          Date :{date}
        </Typography>
      </CardContent>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Note</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
