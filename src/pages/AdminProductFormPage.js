import React from 'react';
import NavBar from '../features/navbar/Navbar';
import { AdminProductList } from '../features/admin/components/AdminProductList';
import { ProductForm } from '../features/admin/components/ProductForm';

function AdminProductFormPage() {
    return (
        <div>
            <NavBar>
                <ProductForm></ProductForm>
            </NavBar>
        </div>
    );
}

export default AdminProductFormPage;