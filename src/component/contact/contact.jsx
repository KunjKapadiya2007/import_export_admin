import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Container,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Contact() {
    const [userdata, setUserdata] = useState([]); // State to store user data
    const navigate = useNavigate(); // Hook to navigate to other pages

    // Fetch data from API
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

    // Handle delete operation
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://import-export-be.onrender.com/api/contacts/${id}`);
            toast.success("User deleted successfully!");
            getData(); // Refresh data after deletion
        } catch (err) {
            console.error("Error deleting data:", err.response?.data || err.message);
            toast.error("Failed to delete the user.");
        }
    };

    // Navigate to add user form
    const handleAddUser = () => {
        navigate("/add-user");
    };

    return (
        <Box>
            <ToastContainer position="top-right" autoClose={3000} />
            <div style={{ padding: "2rem", backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
                <Container maxWidth="xl">
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{ color: "#2b545a", fontWeight: "bold", textTransform: "uppercase" }}
                    >
                        Contact List
                    </Typography>


                    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                                    <TableCell sx={{ fontWeight: "bold", color: "#244E54" }}>Sr No</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", color: "#244E54" }}>Name</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", color: "#244E54" }}>Email</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", color: "#244E54" }}>Contact No</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", color: "#244E54" }}>Comments</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", color: "#244E54" }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userdata.map((item, index) => (
                                    <TableRow key={item._id} sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.contact}</TableCell>
                                        <TableCell>
                                            <Typography
                                                noWrap
                                                sx={{
                                                    textOverflow: "ellipsis",
                                                    overflow: "hidden",
                                                    whiteSpace: "nowrap",
                                                    maxWidth: "200px", // Ellipsis effect for long comments
                                                }}
                                            >
                                                {item.comments}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: "flex", gap: 1 }}>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => handleDelete(item._id)}
                                                    sx={{
                                                        "&:hover": { backgroundColor: "#f44336" },
                                                    }}
                                                >
                                                    <DeleteForeverIcon />
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </div>
        </Box>
    );
}

export default Contact;
