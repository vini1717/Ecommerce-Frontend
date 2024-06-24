import React from 'react';
import NavBar from '../features/navbar/Navbar';
import { AdminProductList } from '../features/admin/components/AdminProductList';
import { AdminOrders } from '../features/admin/components/AdminOrders';

function AdminOrdersPage() {
    return (
        <div>
            <NavBar>
                <AdminOrders></AdminOrders>
            </NavBar>
        </div>
    );
}

export default AdminOrdersPage;