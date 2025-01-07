import React from 'react';
import {Route, Routes} from "react-router-dom";
import Category from "../component/category/category";

function CategoryCall(props) {
    return (
        <>
            <Routes>
                <Route path={'/category'} element={<Category/>}/>
            </Routes>
        </>
    );
}

export default CategoryCall;