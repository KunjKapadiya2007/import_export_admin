import React from 'react';
import {Box} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import AddTestimonial from "../contact/addtestimonial";
import Testimonial from "../contact/testimonial";

function Testimonialss(props) {
    return (
        <Box>
            <Routes>
                <Route path="/testimonial" element={<Testimonial/>} />
                <Route path="/add-testimonial" element={<AddTestimonial />} />
                <Route path="/edit/:id" element={<AddTestimonial />} />
            </Routes>
        </Box>
    );
}

export default Testimonialss;