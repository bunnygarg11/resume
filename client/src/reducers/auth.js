import {REGISTER_FAIL,REGISTER_SUCCESS,USER_LOADED,AUTH_ERROR, LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT,ACCOUNT_DELETED} from "../actions/types"
// import { LOADIPHLPAPI } from "dns"

const initialState={
    token:localStorage.getItem("token"),
    isAuthenticated:false,
    loading:true,
    user:null
}


export default function(state=initialState,action){
    const {type,payload}=action
    switch(type){
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem("token",payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false
            }
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                user:payload,
                loading:false
            }
        case ACCOUNT_DELETED:
        case LOGOUT:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case REGISTER_FAIL:
            localStorage.removeItem("token")
            return {
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false,
                user:null
            }
        default:
            return state

    }
}