import React,{Fragment,useEffect} from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {getPostbyId} from "../../actions/post"
import PostItem from "../posts/PostItem"


const Post=({getPostbyId,match,post:{post,loading}})=>{

    useEffect(()=>{
        getPostbyId(match.params.id)
    },[getPostbyId])

    return loading || post===null?(
        <div>Spinner</div>
    ):(
        <Fragment>
            <Link to="/posts" className="btn">Back To Posts</Link>
            <PostItem post={post} showActions={false}/>
        </Fragment>
    )
}
const mapStateToProps=state=>({
    post:state.post
})
export default connect(mapStateToProps,{getPostbyId})(Post)