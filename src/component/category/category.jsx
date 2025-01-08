import React, {useState, useEffect} from "react";
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
        if (file) formData.append("image", file);

        axios
            .post("https://import-export-be.onrender.com/api/category", formData, {
                headers: {"Content-Type": "multipart/form-data"},
            })
            .then((res) => {
                setData((prevData) => [...prevData, res.data]);
                setCategory("");
                setFile(null);
                setPreview(null);
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

    const handleEdit = (id, name, image) => {
        setEditingId(id);
        setEditingValue(name);
        setEditingFile(null);
        setEditingPreview(image);
        setOpenDialog(true);
    };

    const handleSave = () => {
        if (!editingValue.trim()) {
            alert("Category name cannot be empty");
            return;
        }

        const formData = new FormData();
        formData.append("name", editingValue);
        if (editingFile) formData.append("image", editingFile);

        axios
            .put(`https://import-export-be.onrender.com/api/category/${editingId}`, formData, {
                headers: {"Content-Type": "multipart/form-data"},
            })
            .then((res) => {
                setData((prevData) =>
                    prevData.map((item) =>
                        item._id === editingId ? {...item, name: res.data.name, image: res.data.image} : item
                    )
                );
                setOpenDialog(false);
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

    return (
        <Box>

            <Container>
                <Box sx={{mt: 3}}>
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{color: '#2b545a', fontWeight: 'bold', textTransform: "uppercase"}}
                    >
                        category
                    </Typography>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{fontWeight: "bold", color: "#2B545A", mr: 2}}>
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
                            <Typography variant="h6" sx={{fontWeight: "bold", color: "#2B545A"}}>
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
                                <label htmlFor="product_images" style={{cursor: "pointer"}}>
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
                    </Grid>
                </Box>
            </Container>


            <Box sx={{textAlign: "center", my: 4}}>
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


            <Container>
                <TableContainer component={Paper} sx={{boxShadow: 3, borderRadius: 2}}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{backgroundColor: "#f0f0f0"}}>
                                <TableCell sx={{fontWeight: "bold", color: "#244E54"}}>
                                    Sr No
                                </TableCell>
                                <TableCell sx={{fontWeight: "bold", color: "#244E54"}}>
                                    Image
                                </TableCell>
                                <TableCell sx={{fontWeight: "bold", color: "#244E54"}}>
                                    Category
                                </TableCell>
                                <TableCell sx={{fontWeight: "bold", color: "#244E54"}}>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item, index) => (
                                <TableRow key={item._id} sx={{"&:hover": {backgroundColor: "#f5f5f5"}}}>
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

                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            onClick={() => handleEdit(item._id, item.name, item.image)}
                                            sx={{
                                                "&:hover": {backgroundColor: "darkgreen"},
                                                marginRight: 1,
                                            }}
                                        >
                                            <ModeEditIcon/>
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleDelete(item._id)}
                                            sx={{
                                                "&:hover": {backgroundColor: "#f44336"},
                                            }}
                                        >
                                            <DeleteForeverIcon/>
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
                <DialogContent sx={{width: '300px'}}>
                    <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                        <TextField
                            label="Category Name"
                            fullWidth
                            variant="outlined"
                            value={editingValue}
                            onChange={(e) => setEditingValue(e.target.value)}
                            sx={{backgroundColor: "#fff", borderRadius: 1}}
                        />
                        <Box>
                            <Typography variant="h6" sx={{mb: 1}}>Category Image:</Typography>
                            <Box
                                display="flex"
                                alignItems="center"
                                sx={{
                                    backgroundColor: "#f3f3f3",
                                    borderRadius: 2,
                                    p: 2,
                                    border: "2px dashed #ccc",
                                    overflow: "hidden",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        borderColor: "#000",
                                    },
                                }}
                            >
                                <label htmlFor="edit_product_images" style={{cursor: "pointer", display: "block"}}>
                                    <img
                                        src={editingPreview || img}
                                        alt="Upload Preview"
                                        style={{

                                            width: 200,
                                            objectFit: "cover",
                                            borderRadius: 4,
                                            marginRight: 10,
                                            transition: "transform 0.3s ease",
                                        }}
                                        onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                                        onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                                    />
                                </label>
                                <input
                                    type="file"
                                    id="edit_product_images"
                                    hidden
                                    onChange={handleEditingFileChange}
                                />
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions sx={{justifyContent: "flex-end"}}>
                    <Button onClick={() => setOpenDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
}

export default Category;
