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
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Switch,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import img from "../../assets/images/product/upload_area1.svg";

function Category() {
    const [category, setCategory] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [data, setData] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editingValue, setEditingValue] = useState("");
    const [editingFile, setEditingFile] = useState(null);
    const [editingPreview, setEditingPreview] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [isMainProduct, setIsMainProduct] = useState(false); // State for toggle button
    const [backgroundFile, setBackgroundFile] = useState(null); // State for background image
    const [backgroundPreview, setBackgroundPreview] = useState(null); // Preview for background image

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

        const formData = new FormData();
        formData.append("name", category);
        formData.append("isMainProduct", isMainProduct); // Include isMainProduct
        if (file) formData.append("image", file);
        if (backgroundFile) formData.append("backgroundImage", backgroundFile); // Append background image

        axios
            .post("https://import-export-be.onrender.com/api/category", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                setData((prevData) => [...prevData, res.data]);
                setCategory("");
                setFile(null);
                setPreview(null);
                setBackgroundFile(null); // Reset background image
                setBackgroundPreview(null); // Reset background image preview
                setIsMainProduct(false); // Reset main product toggle
            })
            .catch((err) => console.error(err));
    };

    const handleDelete = (id) => {
        axios
            .delete(`https://import-export-be.onrender.com/api/category/${id}`)
            .then(() => {
                setData((prevData) => prevData.filter((item) => item._id !== id));
            })
            .catch((err) => console.error(err));
    };

    const handleEdit = (id, name, image, backgroundImage, isMainProduct) => {
        setEditingId(id);
        setEditingValue(name);
        setEditingFile(null);
        setEditingPreview(image);
        setBackgroundPreview(backgroundImage);
        setIsMainProduct(isMainProduct); // Set the toggle state when editing
        setOpenDialog(true); // Open dialog
    };

    const handleSave = () => {
        if (!editingValue.trim()) {
            alert("Category name cannot be empty");
            return;
        }

        const formData = new FormData();
        formData.append("name", editingValue);
        formData.append("isMainProduct", isMainProduct); // Include isMainProduct when saving
        if (editingFile) formData.append("image", editingFile);
        if (backgroundFile) formData.append("backgroundImage", backgroundFile); // Update background image if changed

        axios
            .put(`https://import-export-be.onrender.com/api/category/${editingId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                setData((prevData) =>
                    prevData.map((item) =>
                        item._id === editingId ? { ...item, name: res.data.name, image: res.data.image, backgroundImage: res.data.backgroundImage, isMainProduct: res.data.isMainProduct } : item
                    )
                );
                setOpenDialog(false); // Close dialog after saving
            })
            .catch((err) => console.error(err));
    };


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    const handleEditingFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setEditingFile(selectedFile);
        setEditingPreview(URL.createObjectURL(selectedFile));
    };

    const handleBackgroundFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setBackgroundFile(selectedFile);
        setBackgroundPreview(URL.createObjectURL(selectedFile));
    };

    return (
        <Box>
            {/* Input Section */}
            <Container>
                <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2B545A", mr: 2 }}>
                                Category:
                            </Typography>
                            <TextField
                                label="Enter Category"
                                variant="outlined"
                                fullWidth
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
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
                                        src={preview || img}
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
                                    onChange={handleFileChange}
                                />
                            </Box>
                        </Grid>

                        {/* Main Product Toggle */}
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2B545A" }}>
                                Main Product:
                            </Typography>
                            <Switch
                                checked={isMainProduct}
                                onChange={() => setIsMainProduct(!isMainProduct)} // Toggle switch
                                color="primary"
                                inputProps={{ 'aria-label': 'toggle main product' }}
                            />
                        </Grid>

                        {/* Conditional Background Image Upload */}
                        {isMainProduct && (
                            <Grid item xs={12}>
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
                                    <label htmlFor="background_image" style={{ cursor: "pointer" }}>
                                        <img
                                            src={backgroundPreview || img}
                                            alt="Background Upload Preview"
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
                                        id="background_image"
                                        hidden
                                        onChange={handleBackgroundFileChange}
                                    />
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </Container>

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
                                <TableCell sx={{ fontWeight: "bold", color: "#244E54" }}>Sr No</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "#244E54" }}>Image</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "#244E54" }}>Background Image</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "#244E54" }}>Category</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "#244E54" }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item, index) => (
                                <TableRow key={item._id} sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt="Category"
                                                style={{
                                                    width: 100,
                                                    objectFit: "cover",
                                                    borderRadius: 4,
                                                }}
                                            />
                                        ) : (
                                            "Image not found"
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {item.backgroundImage ? (
                                            <img
                                                src={item.backgroundImage}
                                                alt="Category"
                                                style={{
                                                    width: 100,
                                                    objectFit: "cover",
                                                    borderRadius: 4,
                                                }}
                                            />
                                        ) : (
                                            "Image not found"
                                        )}
                                    </TableCell>

                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            onClick={() => handleEdit(item._id, item.name, item.image, item.backgroundImage, item.isMainProduct)}
                                            sx={{
                                                "&:hover": { backgroundColor: "darkgreen" },
                                                marginRight: 1,
                                            }}
                                        >
                                            <ModeEditIcon />
                                        </Button>
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

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Edit Category</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Category Name"
                        variant="outlined"
                        fullWidth
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />

                    {/* Product Image Upload */}
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
                        <label htmlFor="edit_product_image" style={{ cursor: "pointer" }}>
                            <img
                                src={editingPreview || img}
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
                            id="edit_product_image"
                            hidden
                            onChange={handleEditingFileChange}
                        />
                    </Box>


                     Main Product Toggle
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2B545A" }}>
                            Main Product:
                        </Typography>
                        <Switch
                            checked={isMainProduct}
                            onChange={() => setIsMainProduct(!isMainProduct)} // Toggle switch
                            color="primary"
                            inputProps={{ 'aria-label': 'toggle main product' }}
                        />
                    </Box>

                    {isMainProduct && (
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
                            <label htmlFor="edit_background_image" style={{ cursor: "pointer" }}>
                                <img
                                    src={backgroundPreview || img}
                                    alt="Background Upload Preview"
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
                                id="edit_background_image"
                                hidden
                                onChange={handleBackgroundFileChange}
                            />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary" variant="contained">
                        <SaveIcon /> Save
                    </Button>
                </DialogActions>
            </Dialog>


        </Box>
    );
}

export default Category;
