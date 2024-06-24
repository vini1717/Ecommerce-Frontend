import "./App.css"
import CartPage from "./pages/CartPage"
import { Counter } from "./features/counter/Counter"
import NavBar from "./features/navbar/Navbar"
import { ProductList } from "./features/product-list/components/ProductList"
import { Quotes } from "./features/quotes/Quotes"
import logo from "./logo.svg"
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Checkout from "./pages/Checkout"
import ProductDetailsPage from "./pages/ProductDetailsPage"
import { Protected } from "./features/auth/components/Protected"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice"
import { fetchItemsbyUserIdAsync } from "./features/cart/cartSlice"
import PageNotFound from "./pages/PageNotFound"
import OrderSuccess from "./pages/OrderSuccess"
import { UserOrders } from "./features/user/components/UserOrders"
import UserOrderPage from "./pages/UserOrdersPage"
import UserProfilePage from "./pages/UserProfilePage"
import { fetchUserInfoAsync } from "./features/user/userSlice"
import { Logout } from "./features/auth/components/Logout"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import AdminHome from "./pages/AdminHome"
import { ProtectedAdmin } from "./features/auth/components/ProtectedAdmin"
import AdminProductDetailsPage from "./pages/AdminProductDetailsPage"
import AdminProductFormPage from "./pages/AdminProductFormPage"
import AdminOrdersPage from "./pages/AdminOrdersPage"




const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected><Home /></Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin><AdminHome></AdminHome></ProtectedAdmin>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/cart",
    element: <Protected><CartPage /></Protected> ,
  },
  {
    path: "/checkout",
    element: <Protected><Checkout /></Protected> ,
  },
  {
    path: "/product-detail/:id",
    element:  <Protected><ProductDetailsPage /></Protected>,
  },
  {
    path: "/admin/product-detail/:id",
    element:  <ProtectedAdmin><AdminProductDetailsPage /></ProtectedAdmin>,
  },
  {
    path: "/admin/product-form",
    element:  <ProtectedAdmin><AdminProductFormPage></AdminProductFormPage></ProtectedAdmin>,
  },
  {
    path: "/admin/product-form/edit/:id",
    element:  <ProtectedAdmin><AdminProductFormPage></AdminProductFormPage></ProtectedAdmin>,
  },
  {
    path: "/admin/orders",
    element:  <ProtectedAdmin><AdminOrdersPage></AdminOrdersPage></ProtectedAdmin>,
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccess></OrderSuccess> ,
  },
  {
    path: "/orders",
    element: <UserOrderPage></UserOrderPage> ,
  },
  {
    path: "/profile",
    element: <UserProfilePage></UserProfilePage>
  },
  {
    path: "/logout",
    element: <Logout></Logout>
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage></ForgotPasswordPage>
  },
  {
    path: "*",
    element:  <PageNotFound></PageNotFound>
  },

]);


const App = () => {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

useEffect(()=>{
  if(user){
    dispatch(fetchItemsbyUserIdAsync(user.id));
    dispatch(fetchUserInfoAsync(user.id))
  }     
},[dispatch,user])

  return (
    <div className="App">
          <RouterProvider router={router} />

    </div>
  )
}

export default App
