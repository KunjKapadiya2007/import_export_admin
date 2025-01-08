import React from 'react';
import {Box} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import AddTestimonial from "../component/contact/addtestimonial";
import Testimonial from "../component/contact/testimonial";

function Testimonialss(props) {
    return (
        <Box>
            <Routes>
                <Route path="/testimonial" element={<Testimonial/>} />
                <Route path="/add-testimonial" element={<AddTestimonial />} />
                <Route path="/testimonial/edit/:id" element={<AddTestimonial />} />
            </Routes>
        </Box>
    );
}

export default Testimonialss;