import React, { useState, useEffect } from "react";
import { Box, Container, TextField, Typography, Grid, Switch, MenuItem } from "@mui/material";
import img from "../../assets/images/product/upload_area1.svg";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Product() {
    const [
        formData, setFormData] = useState({
        product_images: null,
        backgroundImage: null,
        fields: [
            { id: 1, label: "Product Title", value: "", name: "title" },
            { id: 2, label: "Product Subtitle", value: "", name: "subtitle" },
            {
                id: 3,
                label: "Other Info",
                value: { description1: "", description2: "" },
                name: "other_info",
            },
            { id: 4, label: "Product Category", value: "", name: "category" },
        ],
    });
    const [errors, setErrors] = useState({});
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        // Fetch categories for dropdown
        axios
            .get("https://import-export-be.onrender.com/api/category")
            .then((res) => setCategories(res.data))
            .catch((err) => console.error("Error fetching categories:", err));

        if (id) {
            axios
                .get(`https://import-export-be.onrender.com/api/product/${id}`)
                .then((res) => {
                    const { title, image, subtitle, other_info, category , backgroundImage } = res.data;
                    setFormData((prev) => ({
                        ...prev,
                        fields: prev.fields.map((field) => ({
                            ...field,
                            value:
                                field.name === "title"
                                    ? title
                                    : field.name === "subtitle"
                                        ? subtitle
                                        : field.name === "other_info"
                                            ? other_info || { description1: "", description2: "" }
                                            : field.name === "category"
                                                ? category._id
                                                : field.value,
                        })),
                        product_images: image || null,
                        backgroundImage: backgroundImage || null,
                    }));
                })
                .catch((err) => {
                    console.error("Error fetching product data:", err.response ? err.response.data : err.message);
                });
        }
    }, [id]);
    const handleFileChange = (e, key) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setFormData((prev) => ({ ...prev, [key]: file }));
            setErrors((prev) => ({ ...prev, [key]: "" }));
        } else {
            setErrors((prev) => ({
                ...prev,
                [key]: "Invalid file type. Only images are allowed.",
            }));
        }
    };

    const handleInputChange = (id, value, fieldName) => {
        setFormData((prev) => ({
            ...prev,
            fields: prev.fields.map((field) =>
                field.id === id
                    ? {
                        ...field,
                        value:
                            field.name === "other_info"
                                ? { ...field.value, [fieldName]: value }
                                : field.name === "category"
                                    ? value
                                    : value,
                    }
                    : field
            ),
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.backgroundImage) {
            newErrors.backgroundImage = "Background Image is required when Main Product is enabled.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const fd = new FormData();
        formData.fields.forEach((field) => {
            if (field.name === "other_info") {
                fd.append("other_info", JSON.stringify(field.value));
            } else if (field.name === "category") {
                fd.append("category", field.value);
            } else {
                fd.append(field.name, field.value);
            }
        });

        if (formData.product_images) {
            fd.append("image", formData.product_images);
        }

        if (formData.backgroundImage) {
            fd.append("backgroundImage", formData.backgroundImage);
        }


        const request = id
            ? axios.put(`https://import-export-be.onrender.com/api/product/${id}`, fd)
            : axios.post("https://import-export-be.onrender.com/api/product", fd);

        request
            .then(() => navigate("/allproduct"))
            .catch((err) => {
                console.error("Error submitting product:", err.response ? err.response.data : err.message);
                alert("An error occurred while submitting the product. Please try again.");
            });
    };

    return (
        <Box sx={{ py: 5 , height: "100vh" }}>
            <Container
                maxWidth="lg"
                sx={{
                    background: "#f9f9f9",
                    borderRadius: 4,
                    boxShadow: 8,
                    p: 4,
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        mb: 4,
                        textTransform: "uppercase",
                        color: "#2B545A",
                    }}
                >
                    {id ? "Edit Product" : "Add New Product"}
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2B545A" }}>
                            Product Image:
                        </Typography>
                        <Box
                            display="flex"
                            alignItems="center"
                            mt={2}
                            sx={{
                                backgroundColor: "#f3f3f3",
                                borderRadius: 2,
                                p: 2,
                                border: "2px dashed #ccc",
                            }}
                        >
                            <label htmlFor="product_images" style={{ cursor: "pointer" }}>
                                <img
                                    src={
                                        typeof formData?.product_images === "string"
                                            ? formData?.product_images
                                            : formData?.product_images
                                                ? URL.createObjectURL(formData?.product_images)
                                                : img
                                    }
                                    alt="Upload Preview"
                                    style={{
                                        height: 100,
                                        objectFit: "cover",
                                        borderRadius: 4,
                                        marginRight: 10,
                                    }}
                                />
                            </label>
                            <input
                                type="file"
                                id="product_images"
                                hidden
                                onChange={(e) => handleFileChange(e, "product_images")}
                            />
                        </Box>
                    </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2B545A" }}>
                                Background Image:
                            </Typography>
                            <Box
                                display="flex"
                                alignItems="center"
                                mt={2}
                                sx={{
                                    backgroundColor: "#f3f3f3",
                                    borderRadius: 2,
                                    p: 2,
                                    border: "2px dashed #ccc",
                                }}
                            >
                                <label htmlFor="backgroundImage" style={{ cursor: "pointer" }}>
                                    <img
                                        src={
                                            typeof formData?.backgroundImage === "string"
                                            ? formData?.backgroundImage
                                            : formData?.backgroundImage
                                            ? URL.createObjectURL(formData?.backgroundImage)
                                            : img
                                        }
                                        alt="Upload Preview"
                                        style={{
                                            height: 100,
                                            objectFit: "cover",
                                            borderRadius: 4,
                                            marginRight: 10,
                                        }}
                                    />
                                </label>
                                <input
                                    type="file"
                                    id="backgroundImage"
                                    hidden
                                    onChange={(e) => handleFileChange(e, "backgroundImage")}
                                />
                            </Box>
                            {errors.backgroundImage && (
                                <Typography variant="body2" sx={{ color: "red", mt: 1 }}>
                                    {errors.backgroundImage}
                                </Typography>
                            )}
                        </Grid>

                    {/*<Grid item xs={12} sm={6}>*/}
                    {/*    <Typography variant="h6" sx={{ fontWeight: "bold", pb: 2, color: "#2B545A" }}>*/}
                    {/*        Main Product:*/}
                    {/*    </Typography>*/}
                    {/*    <Switch*/}
                    {/*        checked={formData.isMainProduct}*/}
                    {/*        onChange={handleToggle}*/}
                    {/*        inputProps={{ "aria-label": "Main Product" }}*/}
                    {/*        sx={{*/}
                    {/*            "& .MuiSwitch-track": {*/}
                    {/*                backgroundColor: formData.isMainProduct ? "#2B545A" : "#ccc",*/}
                    {/*            },*/}
                    {/*        }}*/}
                    {/*    />*/}
                    {/*</Grid>*/}

                    {formData.fields.map((field) => {
                        if (field.name === "category") {
                            return (
                                <Grid item xs={12} sm={6} key={field.id}>
                                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2B545A" }}>
                                        {field.label}:
                                    </Typography>
                                    <TextField
                                        select
                                        fullWidth
                                        label={`Select ${field.label}`}
                                        variant="outlined"
                                        value={field.value}
                                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                                    >
                                        {categories.map((category) => (
                                            <MenuItem key={category._id} value={category._id}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            );
                        }
                        if (field.name === "other_info") {
                            return (
                                <Grid item xs={12} key={field.id}>
                                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2B545A" }}>
                                        Other Info:
                                    </Typography>
                                    <Box mb={2}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Enter Description 1"
                                            value={field.value.description1}
                                            onChange={(e) =>
                                                handleInputChange(field.id, e.target.value, "description1")
                                            }
                                        />
                                    </Box>
                                    <Box mb={2}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Enter Description 2"
                                            value={field.value.description2}
                                            onChange={(e) =>
                                                handleInputChange(field.id, e.target.value, "description2")
                                            }
                                        />
                                    </Box>
                                </Grid>
                            );
                        }
                        return (
                            <Grid item xs={12} sm={6} key={field.id}>
                                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2B545A" }}>
                                    {field.label}:
                                </Typography>
                                <TextField
                                    label={`Enter ${field.label}`}
                                    variant="outlined"
                                    fullWidth
                                    value={field.value}
                                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                                />
                            </Grid>
                        );
                    })}
                </Grid>

                <Box sx={{ textAlign: "center", mt: 4 }}>
                    <button
                        onClick={handleSubmit}
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
                        }}
                    >
                        {id ? "Update Product" : "Add Product"}
                    </button>
                </Box>
            </Container>
        </Box>
    );
}

export default Product;
