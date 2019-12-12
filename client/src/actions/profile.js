import Axios from "axios"
import {setAlert} from "./alert"
import {GET_PROFILE,PROFILE_ERROR,UPDATE_PROFILE} from "./types"
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
export const addExperience=(formData,history)=>async dispatch=>{
    try {
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const res=await Axios.put("/api/profile/experience",formData,config)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert("Experience Added","success"))
        history.push("/dashboard")
    } catch (err) {
        const error=err.response.data.errors
        error.forEach(e=>dispatch(setAlert(e.msg,"danger")))
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
        
    }
}
export const addEducation=(formData,history)=>async dispatch=>{
    try {
        const config={
            headers:{
                "Content-Type":"application/json"
            }

        }

        const res=await Axios.put("/api/profile/education",formData,config)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        history.push("/dashboard")
        
    } catch (err) {
        const error=err.response.data.errors
        error.forEach(er=>{
            dispatch(setAlert(er.msg,"danger"))
        })
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.statusText,status:err.status}
        })
        
    }

}

export const deleteExperience=(id)=>async dispatch=>{
    try {
        const res=await Axios.delete(`/api/profile/experience/${id}`)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert("Experience Deleted","success"))
        
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.statusText,status:err.status}
        })
        
    }
}
export const deleteEducation=(id)=>async dispatch=>{
    try {
        const res=await Axios.delete(`/api/profile/education/${id}`)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert("Education Deleted","success"))
        
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.statusText,status:err.status}
        })
        
    }
}