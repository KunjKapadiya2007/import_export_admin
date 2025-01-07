import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";  // Import useNavigate

function Contact() {
    const [userdata, setUserdata] = useState([]);
    const navigate = useNavigate();  // Hook to navigate to other pages

    const getData = async () => {
        try {
            const response = await axios.get("https://import-export-be.onrender.com/api/contacts");
            setUserdata(response.data);
            toast.success("User data loaded successfully!");
        } catch (err) {
            console.error("Error fetching data:", err);
            toast.error("Failed to fetch user data.");
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://import-export-be.onrender.com/api/contacts/${id}`);
            toast.success("User deleted successfully!");
            getData();
        } catch (err) {
            console.error("Error deleting data:", err.response?.data || err.message);
            toast.error("Failed to delete the user.");
        }
    };



    return (
        <Box>
            <ToastContainer position="top-right" autoClose={3000} />

            <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "10px", borderBottom: "1px solid #ccc" }}>
                <h1>All Users</h1>

            </Box>

            <Box sx={{ margin: "20px auto", width: "90%", display: "flex", flexDirection: "column", gap: "10px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", backgroundColor: "#f5f5f5", padding: "10px", borderRadius: "5px" }}>
                    <span style={{ flex: 1 }}>No</span>
                    <span style={{ flex: 2 }}>Name</span>
                    <span style={{ flex: 3 }}>Email</span>
                    <span style={{ flex: 2 }}>Contact No</span>
                    <span style={{ flex: 4 }}>Comments</span>
                    <span style={{ flex: 2 }}>Action</span>
                </Box>

                {userdata.map((item, index) => (
                    <Box
                        key={item._id}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "10px",
                            backgroundColor: "#fff",
                            border: "1px solid #ddd",
                            borderRadius: "5px",
                        }}
                    >
                        <span style={{ flex: 1 }}>{index + 1}</span>
                        <span style={{ flex: 2 }}>{item.name}</span>
                        <span style={{ flex: 3 }}>{item.email}</span>
                        <span style={{ flex: 2 }}>{item.contact}</span>
                        <span style={{ flex: 4 }}>{item.comments}</span>
                        <Box style={{ flex: 2 }}>
                            <button
                                className="btn btn-danger"
                                onClick={() => handleDelete(item._id)}
                                style={{ marginLeft: "10px" }}
                            >
                                <DeleteIcon />
                            </button>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default Contact;
