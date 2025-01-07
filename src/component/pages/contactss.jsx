import React from 'react';
import {Box} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Contact from "../contact/contact";
import AddTestimonial from "../contact/addtestimonial";
import Testimonial from "../contact/testimonial";

function Contactss(props) {
    return (
        <Box>
            <Routes>
                <Route path="/contact" element={<Contact/>} />
            </Routes>
        </Box>
    );
}

export default Contactss;