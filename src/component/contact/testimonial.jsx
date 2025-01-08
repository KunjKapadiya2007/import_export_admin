import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography, Box, Container,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

function Testimonial(props) {

    const [data, setData] = useState([]);

    const navigate = useNavigate();

    const handleAddTestimonial = () => {
        navigate("/add-testimonial");
    };
    useEffect(() => {
        alluser();
    }, []);

    function alluser() {
        axios
            .get('https://import-export-be.onrender.com/api/testimonial')
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }

    function handleDelete(id) {
        axios
            .delete(`https://import-export-be.onrender.com/api/testimonial/${id}`)
            .then(() => alluser())
            .catch((err) => console.log(err));
    }

    const handleEdit = (id) => {
        navigate(`/testimonial/edit/${id}`);
    };
    return (
        <Box>

            <div style={{padding: '2rem', backgroundColor: '#f4f6f8', minHeight: '100vh'}}>
                <Container maxWidth="xl">
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{color: '#2b545a', fontWeight: 'bold', textTransform: "uppercase"}}
                    >
                        Testimonial
                    </Typography>
                    <Box sx={{display: 'flex', justifyContent: 'end'}}>
                        <Box
                            variant="contained"
                            color="primary"
                            onClick={handleAddTestimonial}
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
                            Add Testimonial
                        </Box>
                    </Box>

                    <TableContainer component={Paper} sx={{boxShadow: 3, borderRadius: 2}}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{backgroundColor: '#f0f0f0'}}>
                                    <TableCell sx={{fontWeight: 'bold', color: '#244E54'}}>Sr No</TableCell>
                                    <TableCell sx={{fontWeight: 'bold', color: '#244E54'}}>Image</TableCell>
                                    <TableCell sx={{fontWeight: 'bold', color: '#244E54'}}>Name</TableCell>
                                    <TableCell sx={{fontWeight: 'bold', color: '#244E54'}}>Role</TableCell>
                                    <TableCell sx={{fontWeight: 'bold', color: '#244E54'}}>Description</TableCell>
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
                                                alt="Image"
                                                width={'20%'}
                                                style={{borderRadius: '8px', cursor: 'pointer'}}
                                            />
                                        </TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.role}</TableCell>
                                        <TableCell>
                                            <Typography
                                                noWrap
                                                sx={{
                                                    textOverflow: "ellipsis",
                                                    overflow: "hidden",
                                                    whiteSpace: "nowrap",
                                                    maxWidth: "200px",
                                                }}
                                            >
                                                {item.description}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    onClick={() => handleEdit(item._id)}
                                                    sx={{
                                                        '&:hover': { backgroundColor: 'darkgreen' },
                                                    }}
                                                >
                                                    <ModeEditIcon />
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => handleDelete(item._id)}
                                                    sx={{
                                                        '&:hover': { backgroundColor: '#f44336' },
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

export default Testimonial;