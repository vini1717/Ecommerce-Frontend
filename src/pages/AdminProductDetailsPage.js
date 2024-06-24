import React from 'react';
import ProductDetails from '../features/product-list/components/ProductDetails';
import NavBar from '../features/navbar/Navbar';
import AdminProductDetails from '../features/admin/components/AdminProductDetails';


function AdminProductDetailsPage() {
    return (
        <div>
            <NavBar>
            <AdminProductDetails></AdminProductDetails>
            </NavBar>
            
        </div>
    );
}

export default AdminProductDetailsPage;