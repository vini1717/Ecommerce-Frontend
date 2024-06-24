import NavBar from '../features/navbar/Navbar';
import { UserOrders } from '../features/user/components/UserOrders';


function UserOrderPage() {
    return (
        <div>
            <NavBar>
                <h1 className='text-2xl mx-auto'>My Orders</h1>
                <UserOrders></UserOrders>
            </NavBar>
            
        </div>
    );
}

export default UserOrderPage;