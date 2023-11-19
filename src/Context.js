import React, { useContext, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom";

const GlobalContext = React.createContext();
const BASE_URL = "https://backendnote-jy9w.onrender.com";
export const GlobalProvider = ({ children }) => {
  
    const [details,setDetails] = useState({ email: "" })
  const [errorMessage, setErrorMessage] = useState("");
  const [note, setNote] = useState([])
  const[notes,setNotes]= useState([])
 const {name} = useParams()
    const addUser = async (Name, email, password, confirmPassword) => {
        try {

            const response = await axios.post(`${BASE_URL}/signup`, {
              Name,
              email,
              password,
              confirmPassword,
            });
           
            return response;
        } catch (error) {
            if (error.response.data.message === "Email already exist") {
                setErrorMessage("Email already exists")
            }
            throw error;
        }
    }

    const loginUser = async (email, password) => {
        try {
            const response = await axios.post(`${BASE_URL}/login`,
                { email, password },
            )
            console.log(response.data)
            return response
        } catch (error) {
            console.log(error)
             if (error.response.data.message === "Invalid Email") {
               setErrorMessage("Invalid Email");
             }
             throw error;
        }
         
    }

    const createNote = async (
      title,
      description,
      date
    ) => {
      try {
        const response = await axios.post(
          `${BASE_URL}/create-notes`,
          {
            title,
            description,
            date,
          },
          {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );

        return response;
      } catch (err) {
        console.log(err);
         throw err;
      }
  };
  

   const getAllNotes = async () => {
     try {
       const response = await axios.get(`${BASE_URL}/all-notes`, {
         headers: {
           "x-auth-token": localStorage.getItem("token"),
         },
       });

       if (response && response.data) {
         setNote(response.data.data);
       }
       return response
     } catch (error) {
       console.log(error);
       throw  error
     }
  };
  
 const getNotesByName = async (name) => {
   try {
     const response = await axios.get(
       `https://backendnote-jy9w.onrender.com/notes-name/${name}`,
       {
         headers: {
           "x-auth-token": localStorage.getItem("token"),
         },
       }
     );
    
     if (response && response.data) {
        console.log(response.data.data);
       setNotes(response.data.data);
     }
     return response;
   
   } catch (error) {
     console.error(`Error fetching notes by name "${name}":`, error);
     throw error;
   }
 };
    const contextValue = {
      addUser,
      loginUser,
      setErrorMessage,
      createNote,
      getAllNotes, note, setNote,getNotesByName
      
    };
    return (
      <GlobalContext.Provider  value={contextValue}>
        {children}
      </GlobalContext.Provider>
    );
}
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};