import React from 'react';
import ProductDetails from '../features/product-list/components/ProductDetails';
import NavBar from '../features/navbar/Navbar';


function ProductDetailsPage() {
    return (
        <div>
            <NavBar>
            <ProductDetails />
            </NavBar>
            
        </div>
    );
}

export default ProductDetailsPage;