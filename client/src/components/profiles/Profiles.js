import React,{Fragment,useEffect,useState} from "react"
import {connect} from "react-redux"
import {getProfiles} from "../../actions/profile"
import ProfileItem from "./profileItem"

const Profiles=({profile:{profiles,loading},getProfiles})=>{
    useEffect(()=>{
        getProfiles()
    },[])

    return (
        <Fragment>
            <h1 className="large text-primary">Developers</h1>
            <p>
                <i className="fab fa-connectdevelop" />
               Browse and connect with developers
            </p>
            <div>
                {profiles.length>0?(
                    profiles.map(profile=>(
                   <ProfileItem key={profile._id} profile={profile} />     
                    ))
                ):(
                    <h4>No profiles found...</h4>
                )}
            </div>
        </Fragment>
    )
}
const mapStatetoProps=state=>({
    profile:state.profile
})

export default connect(mapStatetoProps,{getProfiles})(Profiles)