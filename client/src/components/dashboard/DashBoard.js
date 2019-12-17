import React,{useEffect,Fragment} from "react"
import {connect} from "react-redux"
import {getCurrentprofile,deleteAccount} from "../../actions/profile"
import {Redirect,Link} from "react-router-dom"
import DashboardActions from "./DashboardActions"
import Experience from "./Experience"
import Education from "./Education"

const Dashboard =({profile:{profile,loading},getCurrentprofile,auth:{user},deleteAccount})=>{
    useEffect(()=>{
        getCurrentprofile()
    },[getCurrentprofile])
   
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
            <div className="my-2">
                <button className="btn btn-danger" onClick={deleteAccount} >
                    <i className="fas fa-user-minus" />
                    Delete my account
                </button>
            </div>
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
export default connect(mapStatetoProps,{getCurrentprofile,deleteAccount})(Dashboard)