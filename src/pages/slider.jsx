import React from 'react';
import Addpage from "../component/slider/addpage";
import Addslider from "../component/slider/addslider";
import {Route, Routes} from "react-router-dom";

function Slider(props) {
    return (
        <>
            <Routes>
                <Route path="/slider" element={<Addpage/>} />
                <Route path="/addslider" element={<Addslider />} />
                {/*<Route path="/edit/:id" element={<Addslider />} />*/}
            </Routes>
        </>
    );
}

export default Slider;