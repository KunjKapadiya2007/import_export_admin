import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";

function Category() {
    const [category, setCategory] = useState("");
    const [data, setData] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editingValue, setEditingValue] = useState("");

    // Fetch categories from backend
    useEffect(() => {
        axios
            .get("https://import-export-be.onrender.com/api/category")
            .then((res) => setData(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleAddCategory = () => {
        if (!category.trim()) {
            alert("Category cannot be empty");
            return;
        }
        axios
            .post("https://import-export-be.onrender.com/api/category", { name: category })
            .then((res) => {
                setData((prevData) => [...prevData, res.data]); // Append new category to table
                setCategory(""); // Clear input field
            })
            .catch((err) => console.error(err));
    };

    const handleDelete = (id) => {
        axios
            .delete(`https://import-export-be.onrender.com/api/category/${id}`)
            .then(() => {
                setData((prevData) => prevData.filter((item) => item._id !== id)); // Update table
            })
            .catch((err) => console.error(err));
    };

    const handleEdit = (id, name) => {
        setEditingId(id);
        setEditingValue(name);
    };

    const handleSave = (id) => {
        if (!editingValue.trim()) {
            alert("Category name cannot be empty");
            return;
        }
        axios
            .put(`https://import-export-be.onrender.com/api/category/${id}`, { name: editingValue })
            .then((res) => {
                setData((prevData) =>
                    prevData.map((item) =>
                        item._id === id ? { ...item, name: res.data.name } : item
                    )
                );
                setEditingId(null);
                setEditingValue("");
            })
            .catch((err) => console.error(err));
    };

    const handleCategoryChange = (value) => {
        setCategory(value);
    };

    return (
        <Box>
            {/* Input Section */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 3,
                }}
            >
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: "bold", color: "#2B545A", mr: 2, textWrap: "nowrap" }}
                            >
                                Category :-
                            </Typography>
                            <TextField
                                label="Enter Category"
                                variant="outlined"
                                fullWidth
                                value={category}
                                onChange={(e) => handleCategoryChange(e.target.value)}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* Add Category Button */}
            <Box sx={{ textAlign: "center", my: 4 }}>
                <button
                    style={{
                        padding: "12px 24px",
                        borderRadius: 3,
                        border: "none",
                        background: "#2B545A",
                        color: "#fff",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        transition: "background 0.3s",
                    }}
                    onClick={handleAddCategory}
                    onMouseEnter={(e) => (e.target.style.background = "#244E54")}
                    onMouseLeave={(e) => (e.target.style.background = "#2B545A")}
                >
                    Add Category
                </button>
            </Box>

            {/* Table Section */}
            <Container>
                <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                                <TableCell sx={{ fontWeight: "bold", color: "#244E54" }}>
                                    Sr No
                                </TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "#244E54" }}>
                                    Category
                                </TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "#244E54" }}>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item, index) => (
                                <TableRow
                                    key={item._id}
                                    sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
                                >
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        {editingId === item._id ? (
                                            <TextField
                                                value={editingValue}
                                                onChange={(e) => setEditingValue(e.target.value)}
                                                fullWidth
                                                variant="outlined"
                                            />
                                        ) : (
                                            item.name
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editingId === item._id ? (
                                            <Button
                                                variant="contained"
                                                color="success"
                                                onClick={() => handleSave(item._id)}
                                                sx={{
                                                    "&:hover": { backgroundColor: "darkgreen" },
                                                    marginRight: 1,
                                                }}
                                            >
                                                <SaveIcon />
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                color="success"
                                                onClick={() => handleEdit(item._id, item.name)}
                                                sx={{
                                                    "&:hover": { backgroundColor: "darkgreen" },
                                                    marginRight: 1,
                                                }}
                                            >
                                                <ModeEditIcon />
                                            </Button>
                                        )}
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
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    );
}

export default Category;
