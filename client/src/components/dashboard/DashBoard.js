import React from "react"
import {connect} from "react-redux"
import {getCurrentprofile} from "../../actions/profile"

const Dashboard =({profile,getCurrentprofile})=>(
    <div>
        DashBoard
    </div>
)
const mapStatetoProps=state=>({
    profile:state.profile
})
export default connect(mapStatetoProps,{getCurrentprofile})(Dashboard)