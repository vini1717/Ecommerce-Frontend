import { useSelector } from "react-redux"
import { selectLoggedInUser } from "../authSlice";
import {Navigate} from 'react-router-dom';

export const Protected = ({children}) =>{
    const users = useSelector(selectLoggedInUser);
    if(!users)
    {
        return <Navigate to='/login' replace={true}></Navigate>   
    }
    else
        return children
}