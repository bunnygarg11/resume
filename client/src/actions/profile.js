import Axios from "axios"
import {setAlert} from "./alert"
import {GET_PROFILE,PROFILE_ERROR} from "./types"
export const getCurrentprofile=()=>async dispatch=>{
    try {
        const res= await Axios.get("/api/profile/me")
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
        
    }
}

export const createProfile=(formData,history,edit=false)=>async dispatch=>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }

    try {
        const res=await Axios.post("/api/profile",formData,config)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })

        dispatch(setAlert(edit?"Profile Updated":"Profile Created","success"))
        if (!edit) {
            history.push('/dashboard');
          }
        
    } catch (err) {
        const error=err.response.data.errors
        error.forEach(er=>dispatch(setAlert(er.msg,"danger")))
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
          });
        
    }
}