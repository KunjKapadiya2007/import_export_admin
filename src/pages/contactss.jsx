import React from 'react';
import {Box} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Contact from "../component/contact/contact";
import AddTestimonial from "../component/contact/addtestimonial";
import Testimonial from "../component/contact/testimonial";

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