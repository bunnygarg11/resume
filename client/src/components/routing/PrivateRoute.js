import React from "react"
import {Redirect,Route} from "react-router-dom"
import {connect} from "react-redux"

const PrivateRoute=({component:Component,auth:{isAuthenticated,loading},...rest})=>{
    console.log(isAuthenticated,loading);
    
    return (
    <Route {...rest} render={props=>!isAuthenticated ?(<Redirect to="/login"/>):(<Component {...props}/>)}/>
)}

const mapStatetoProps=(state)=>({
    auth:state.auth
})
export default connect(mapStatetoProps)(PrivateRoute)