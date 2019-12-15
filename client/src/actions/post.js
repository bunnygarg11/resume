import {GET_POSTS,POST_ERROR,UPDATE_LIKES,DELETE_POST,ADD_POST,GET_POST,ADD_COMMENT,REMOVE_COMMENT} from "./types"
import {setAlert} from "./alert"
import Axios from "axios"

export const getPosts=()=>async dispatch=>{
    try {
       const res= await Axios.get("/api/posts")
       dispatch({
           type:GET_POSTS,
           payload:res.data
       })
        
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}

export const addLike=(postId)=>async dispatch=>{
    try {
        const res =await Axios.put(`/api/posts/like/${postId}`)
        dispatch({
            type:UPDATE_LIKES,
            payload:{postId,likes:res.data}
        })
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
export const removeLike=(postId)=>async dispatch=>{
    try {
        const res=await Axios.put(`/api/posts/unlike/${postId}`)
        dispatch({
            type:UPDATE_LIKES,
            payload:{postId,likes:res.data}
        })
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
export const deletePost=(postId)=>async dispatch=>{
    try {
       const res= await Axios.delete(`/api/posts/${postId}`)
        dispatch({
            type:DELETE_POST,
            payload:postId
        })
        dispatch(setAlert(res.data.msg,"success"))

    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
export const addPost=(formdata)=>async dispatch=>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    try {
        const res=await Axios.post("/api/posts",formdata,config)
        dispatch({
            type:ADD_POST,
            payload:res.data
        })
        dispatch(setAlert("POST ADDED SUCCESSFULLY","success"))
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
export const getPostbyId=id=>async dispatch=>{
    try {
        const res=await Axios.get(`/api/posts/${id}`)
        dispatch({
            type:GET_POST,
            payload:res.data
        })
        
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
export const addComment=(postId,formdata)=>async dispatch=>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    try {
        const res=await Axios.post(`/api/posts/comment/${postId}`,formdata,config)
        dispatch({
            type:ADD_COMMENT,
            payload:res.data
        })
        dispatch(setAlert("COMMENT ADDED","success"))
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
        
    }

}

export const removeComment=(postId,commentId)=>async dispatch=>{
    try {
        await Axios.delete(`/api/posts/comment/${postId}/${commentId}`)
        dispatch({
            type:REMOVE_COMMENT,
            payload:commentId
        })
        dispatch(setAlert("Comment Removed","success"))
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}