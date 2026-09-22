import { userActions } from "./user-slice.js";
import {axiosInstance} from "../../utils/axios"

//signup 

export const getSignup = (user) => async(dispatch)=>{
    try {
        dispatch(userActions.getSignupRequest());
        const {data}= await axiosInstance.post("/v1/rent/user/signup",user);
        dispatch(userActions.getSignupDetails(data.user));

    } catch (error) {
        dispatch(userActions.getError(error.response.data.message));
    }
}

//login

export const getLogin=(user)=>async(dispatch)=>{
    try {
        dispatch(userActions.getLoginRequest())
        const {data}= await axiosInstance.post("/v1/rent/user/login",user);
        dispatch(userActions.getLoginDetails(data.user));
    } catch (error) {
        dispatch(userActions.getError(error.response.data.message));
    }
}
export const currentUser=()=>async(dispatch)=>{
    try{
        dispatch(userActions.getCureentRequest())
        const {data}= await axiosInstance.get("/v1/rent/user/me");
        dispatch(userActions.getCurrentUser(data.user));
    }catch(error){
        dispatch(userActions.getLogout(null));
    }
}

export const updateUser=(user)=>async(dispatch)=>{
    try{
        dispatch(userActions.getUpdateUserRequest())
        await axiosInstance.patch("/v1/rent/user/updateMe",user);
        const {data}= await axiosInstance.get("/v1/rent/user/me");
        dispatch(userActions.getCurrentUser(data.user));
        return data.user;
    }catch(error){
        dispatch(userActions.getError(error.response?.data?.message || error.message));
        throw error;
    }   
}

export const forgotPassword=(email)=>async(dispatch)=>{
    try{
        await axiosInstance.post("/v1/rent/user/forgotPassword",email);
    } catch (error) {
        dispatch(userActions.getError(error.response.data.message));
    }

}


export const resetPassword=(repassword,token)=>async(dispatch)=>{
    try{
        await axiosInstance.patch(`/v1/rent/user/resetPassword/${token}`,repassword);
    }catch(error){
        dispatch(userActions.getError(error.response.data.message));
    }
}

export const updatePassword=(passwords)=>async(dispatch)=>{
    try{
        dispatch(userActions.getPasswordRequest())
        await axiosInstance.patch("/v1/rent/user/updateMyPassword",passwords);
        dispatch(userActions.getPasswordSuccess(true));
    }catch(error){
        dispatch(userActions.getError(error.response.data.message));
    }
}

export const logout=()=>async(dispatch)=>{
    try {
        await axiosInstance.get("/v1/rent/user/logout")
        dispatch(userActions.getLogout(null));
    } catch (error) {
        dispatch(userActions.getError(error.response.data.message));
    }
}