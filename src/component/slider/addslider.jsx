import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import img from '../../assets/images/slider/upload_area1.svg';

function Addslider() {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    useEffect(() => {
        if (id) {
            axios
                .get(`https://import-export-be.onrender.com/api/slider/${id}`)
                .then((res) => {
                    setTitle(res.data.title);
                    setImage(res.data.image);
                })
                .catch((err) => console.log(err));
        }
    }, [id]);

    function handleSubmit(e) {
        e.preventDefault();

        const fd = new FormData();
        fd.append('title', title);
        if (image) {
            fd.append('image', image);
        }
        if (id) {
            axios
                .put(`https://import-export-be.onrender.com/api/slider/${id}`, fd)
                .then(() => navigate('/slider'))
                .catch((err) => console.log(err));
        } else {
            axios
                .post('https://import-export-be.onrender.com/api/slider', fd)
                .then(() => navigate('/slider'))
                .catch((err) => console.log(err));
        }
    }

    function handleUser(e) {
        const { value } = e.target;
        setTitle(value);
    }

    return (
            <Box sx={{
                py:8,
            }}>
        <Container maxWidth="sm">
                <Box sx={{
                background: '#f9f9f9',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: 3,
                    backgroundColor: '#f7f7f7',
                    borderRadius: 4,
                    padding: "50px 50px",
                    boxShadow: 8,
                }}>
                    <Typography variant="h4" align="center" color="primary" sx={{ fontWeight: "bold" , color: '#244e54' ,textTransform:"uppercase" ,mb:3 }}>
                        {id ? 'Edit Slider' : 'Add User'}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold",color: '#2b545a' }}>
                            Product Img:
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
                                    cursor: 'pointer',
                                    borderRadius: '10px',
                                    objectFit: 'cover',
                                    border: '2px dashed #3f51b5',
                                    padding: '5px',
                                    transition: 'transform 0.3s ease',
                                }}
                                onMouseEnter={e => e.target.style.transform = 'scale(1.1)'}
                                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                            />
                        </label>
                        <input type="file" id="image" name="image" onChange={handleFileChange} hidden required />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight:"bold",color: '#2b545a' }}>
                            Product Title:
                        </Typography>
                        <TextField
                            label="Title"
                            variant="outlined"
                            fullWidth
                            name="title"
                            value={title}
                            onChange={handleUser}
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: 3,
                                    padding: '10px',
                                },
                            }}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
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
                </Box>
        </Container>
            </Box>
    );
}

export default Addslider;
