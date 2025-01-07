import React from 'react';
import Product from "../component/products/product";
import AllProduct from "../component/products/allProduct";
import {Route, Routes} from "react-router-dom";

function Products(props) {
    return (
        <>
            {/*<AllProduct/>*/}
            {/*<Product/>*/}
            <Routes>
                <Route path={'/allproduct'} element={<AllProduct/>}/>
                <Route path={'/product'} element={<Product/>}/>
                <Route path={'/edit/:id'} element={<Product/>}/>
            </Routes>

        </>
    );
}

export default Products;