import React,{Fragment,useEffect} from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {getPostbyId} from "../../actions/post"
import PostItem from "../posts/PostItem"
import CommentForm from "./CommentForm"
import CommentItem from "./CommentItem"


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
            <CommentForm postId={post._id}/>
            <div className="comments">
                {post.comments.map(comment=>(
                    <CommentItem key={comment._id} comment={comment} postId={post._id}/>
                ))}
            </div>
        </Fragment>
    )
}
const mapStateToProps=state=>({
    post:state.post
})
export default connect(mapStateToProps,{getPostbyId})(Post)