import React,{useEffect,Fragment} from "react"
import {connect} from "react-redux"
import {getCurrentprofile} from "../../actions/profile"
import {Redirect,Link} from "react-router-dom"
import DashboardActions from "./DashboardActions"
import Experience from "./Experience"
import Education from "./Education"

const Dashboard =({profile:{profile,loading},getCurrentprofile,auth:{isAuthenticated,user}})=>{
    useEffect(()=>{
        getCurrentprofile()
    },[])
   
    return (
    <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
        <i className="fas fa-user"/>
        Welcome {user && user.name}
        </p>
        {profile!==null?(<Fragment>
            <DashboardActions/>
            <Experience experience={profile.experience}/>
            <Education education={profile.education}/>
        </Fragment>):(<Fragment>
            <p>You have not yet stup a profile, please add some info</p>
            <Link to="/create-profile">
            Create Profile
            </Link>
        </Fragment>)}
    </Fragment>
)}
const mapStatetoProps=state=>({
    profile:state.profile,
    auth:state.auth
})
export default connect(mapStatetoProps,{getCurrentprofile})(Dashboard)