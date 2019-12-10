import React,{useEffect} from "react"
import {connect} from "react-redux"
import {getCurrentprofile} from "../../actions/profile"

const Dashboard =({profile,getCurrentprofile,auth})=>{
    useEffect(()=>{
        getCurrentprofile()
    },[])
    return (
    <div>
        DashBoard
    </div>
)}
const mapStatetoProps=state=>({
    profile:state.profile,
    auth:state.auth
})
export default connect(mapStatetoProps,{getCurrentprofile})(Dashboard)