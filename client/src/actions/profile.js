import Axios from "axios"
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