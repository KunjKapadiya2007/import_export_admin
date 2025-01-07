import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import img from "../../assets/images/testimonial/upload_area1.svg";

function AddTestimonial() {
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false); // For handling loading state
    const navigate = useNavigate();
    const { id } = useParams(); // Get the testimonial ID from the URL

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file); // Set the selected file
        }
    };

    useEffect(() => {
        // If editing, fetch testimonial data
        if (id) {
            setLoading(true); // Set loading to true while data is being fetched
            axios
                .get(`https://import-export-be.onrender.com/api/testimonial/${id}`)
                .then((res) => {
                    const data = res.data;
                    setName(data.name || "");
                    setRole(data.role || "");
                    setDescription(data.description || "");
                    setImage(data.image || null); // Use the image URL for display
                })
                .catch((err) => console.error("Error fetching testimonial data:", err))
                .finally(() => setLoading(false)); // Ensure loading is set to false
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !role || !description || (!image && typeof image !== "string")) {
            alert("Please provide all required fields!");
            return;
        }

        const fd = new FormData();
        fd.append("name", name);
        fd.append("role", role);
        fd.append("description", description);

        // Append file only if a new image is uploaded
        if (typeof image !== "string") {
            fd.append("image", image);
        }

        if (id) {
            // Update the testimonial
            axios
                .put(`https://import-export-be.onrender.com/api/testimonial/${id}`, fd)
                .then((response) => {
                    console.log("Update successful:", response);
                    navigate("/testimonial");
                })
                .catch((err) => console.error("Error updating testimonial:", err));
        } else {
            // Add a new testimonial
            axios
                .post("https://import-export-be.onrender.com/api/testimonial", fd)
                .then((response) => {
                    console.log("Create successful:", response);
                    navigate("/testimonial");
                })
                .catch((err) => console.error("Error creating testimonial:", err));
        }
    };

    const handleTitleChange = (e) => setName(e.target.value);
    const handleRoleChange = (e) => setRole(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);

    if (loading) {
        return (
            <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                Loading Testimonial Data...
            </Typography>
        );
    }

    return (
        <Box sx={{ py: 8 }}>
            <Container maxWidth="sm">
                <Box
                    sx={{
                        background: "#f9f9f9",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: 3,
                        backgroundColor: "#f7f7f7",
                        borderRadius: 4,
                        padding: "50px 50px",
                        boxShadow: 8,
                    }}
                >
                    <Typography
                        variant="h4"
                        align="center"
                        color="primary"
                        sx={{
                            fontWeight: "bold",
                            color: "#244e54",
                            textTransform: "uppercase",
                            mb: 3,
                        }}
                    >
                        {id ? "Edit Testimonialss" : "Add Testimonialss"}
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2b545a" }}>
                            Testimonial Image:
                        </Typography>
                        <label htmlFor="image">
                            <img
                                src={
                                    typeof image === "string"
                                        ? image
                                        : image
                                            ? URL.createObjectURL(image)
                                            : img
                                }
                                alt="Upload Preview"
                                style={{
                                    height: 120,
                                    cursor: "pointer",
                                    borderRadius: "10px",
                                    objectFit: "cover",
                                    border: "2px dashed #3f51b5",
                                    padding: "5px",
                                    transition: "transform 0.3s ease",
                                }}
                                onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                            />
                        </label>
                        <input type="file" id="image" name="image" onChange={handleFileChange} hidden />
                    </Box>

                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        name="name"
                        value={name}
                        onChange={handleTitleChange}
                        sx={{
                            "& .MuiInputBase-root": {
                                borderRadius: 3,
                                padding: "10px",
                            },
                        }}
                    />

                    <TextField
                        label="Role"
                        variant="outlined"
                        fullWidth
                        name="role"
                        value={role}
                        onChange={handleRoleChange}
                        sx={{
                            "& .MuiInputBase-root": {
                                borderRadius: 3,
                                padding: "10px",
                            },
                        }}
                    />

                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        name="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        sx={{
                            "& .MuiInputBase-root": {
                                borderRadius: 3,
                                padding: "10px",
                            },
                        }}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{
                            padding: "12px 24px",
                            borderRadius: 3,
                            border: "none",
                            background: "#2B545A",
                            color: "#fff",
                            fontSize: "1rem",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            cursor: "pointer",
                            "&:hover": {
                                background: "#244e54",
                            },
                        }}
                    >
                        Submit
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}

export default AddTestimonial;
