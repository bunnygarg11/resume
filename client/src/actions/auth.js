import {REGISTER_FAIL,REGISTER_SUCCESS} from "./types"

import Axios from "axios"
import {setAlert} from "./alert"

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