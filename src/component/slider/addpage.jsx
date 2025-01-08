import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

function Addpage() {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false); // State to manage modal visibility
    const [currentItem, setCurrentItem] = useState(null); // State to store the current item for editing
    const [editedTitle, setEditedTitle] = useState(""); // State to manage the edited title
    const [editedImage, setEditedImage] = useState(null); // State to manage the edited image
    const navigate = useNavigate();

    useEffect(() => {
        alluser();
    }, []);

    function alluser() {
        axios
            .get('https://import-export-be.onrender.com/api/slider')
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }

    function handleDelete(id) {
        axios
            .delete(`https://import-export-be.onrender.com/api/slider/${id}`)
            .then(() => alluser())
            .catch((err) => console.log(err));
    }

    const handleEditClick = (item) => {
        setCurrentItem(item);
        setEditedTitle(item.title); // Set the initial title
        setEditedImage(item.image); // Set the initial image
        setOpen(true);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditedImage(file);
        }
    };

    const handleEditSave = async () => {
        const formData = new FormData();
        formData.append("title", editedTitle);
        if (editedImage instanceof File) {
            formData.append("image", editedImage);
        }

        try {
            await axios.put(
                `https://import-export-be.onrender.com/api/slider/${currentItem._id}`,
                formData,
                {headers: {"Content-Type": "multipart/form-data"}}
            );
            alluser();
            setOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{padding: '2rem', backgroundColor: '#f4f6f8', minHeight: '100vh'}}>
            <Container maxWidth="xl">
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{color: '#2b545a', fontWeight: 'bold', textTransform: "uppercase"}}
                >
                    Product Slider
                </Typography>
                <Box sx={{display: 'flex', justifyContent: 'end'}}>
                    <Box
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/addslider')}
                        sx={{
                            padding: "12px 24px",
                            borderRadius: 3,
                            border: "none",
                            mb: 5,
                            background: "#2B545A",
                            color: "#fff",
                            fontSize: "1rem",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            cursor: "pointer",
                            "&:hover": {
                                background: "#244e54"
                            }
                        }}
                    >
                        Add User
                    </Box>
                </Box>

                <TableContainer component={Paper} sx={{boxShadow: 3, borderRadius: 2}}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{backgroundColor: '#f0f0f0'}}>
                                <TableCell sx={{fontWeight: 'bold', color: '#244E54'}}>Sr No</TableCell>
                                <TableCell sx={{fontWeight: 'bold', color: '#244E54'}}>Slider</TableCell>
                                <TableCell sx={{fontWeight: 'bold', color: '#244E54'}}>Title</TableCell>
                                <TableCell sx={{fontWeight: 'bold', color: '#244E54'}}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item, index) => (
                                <TableRow key={item.id} sx={{'&:hover': {backgroundColor: '#f5f5f5'}}}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell sx={{width: '20%'}}>
                                        <img
                                            src={item.image}
                                            alt="slider"
                                            width={'50%'}
                                            style={{borderRadius: '8px', cursor: 'pointer'}}
                                        />
                                    </TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="warning"
                                            onClick={() => handleEditClick(item)}
                                            sx={{
                                                marginRight: 1,
                                                '&:hover': {backgroundColor: '#ff9800'},
                                            }}
                                        >
                                            <ModeEditIcon/>
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleDelete(item._id)}
                                            sx={{
                                                '&:hover': {backgroundColor: '#f44336'},
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

            {/* Modal for editing */}
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Edit Slider</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Title"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        margin="normal"
                    />
                    <Typography variant="body1" sx={{marginTop: 2}}>Current Image:</Typography>
                    <img
                        src={currentItem?.image}
                        alt="Current slider"
                        width="100%"
                        style={{borderRadius: '8px', marginBottom: '1rem'}}
                    />
                    <Button
                        variant="contained"
                        component="label"
                        sx={{marginBottom: 2}}
                    >
                        Upload New Image
                        <input
                            type="file"
                            hidden
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleEditSave} color="primary" variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Addpage;
