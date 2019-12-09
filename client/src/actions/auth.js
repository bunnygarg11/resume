import {REGISTER_FAIL,REGISTER_SUCCESS,USER_LOADED,AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAIL} from "./types"

import Axios from "axios"
import {setAlert} from "./alert"
import setAuthToken from "../utils/setAuthToken"

export  const register=({name,email,password})=>async dispatch=>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const body=JSON.stringify({name,email,password})

    try {
        const res=await Axios.post("/api/users",body,config)
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })
    } catch (err) {
        const error=err.response.data.errors
        error.forEach(er=>dispatch(setAlert(er.msg,"danger")))

        
        dispatch({
            type:REGISTER_FAIL
        })
        
    }

}
export const loaduser=()=>async dispatch=>{
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try {
        const res=await Axios.get("/api/auth")
        dispatch({
            type:USER_LOADED,
            payload:res.data
        })
    } catch (error) {
        dispatch({type:AUTH_ERROR})
    }
}
export const login=(email,password)=>async dispatch=>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const body=JSON.stringify({email,password})

    try {
        const res=await Axios.post("/api/auth",body,config)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })
    } catch (err) {
        const error=err.response.data.errors
        error.forEach(er=>dispatch(setAlert(er.msg,"danger")))

        
        dispatch({
            type:LOGIN_FAIL
        })
        
    }

}