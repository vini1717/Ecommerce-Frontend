import { useDispatch ,useSelector } from "react-redux"
import { selectLoggedInUser, signOutAsync } from "../authSlice";
import {Navigate} from 'react-router-dom';
import { useEffect } from "react";
import { signOut } from "../authAPI";

export const Logout = () =>{
    const user = useSelector(selectLoggedInUser);
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(signOutAsync(user.id))
    },[])
   
    return(
        <>
        {console.log(user)}
            {!user && <Navigate to='/login' replace={true}></Navigate>}
        </>
    )
}