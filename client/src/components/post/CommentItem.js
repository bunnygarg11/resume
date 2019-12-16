import React,{Fragment} from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {removeComment} from "../../actions/post"
import Moment from "react-moment"

const CommentItem=({removeComment,
    comment:{_id,text,name,avatar,user,date},
    auth,
    postId})=>{
        return (
            <div className="post bg-white p-1 my-1">
                <div>
                    <Link to={`/profile/${user}`}>
                        <img className="round-img" src={avatar} alt=""/>
                        <h4>{name}</h4>
                    </Link>
                </div>
                <div>
                    <p className="my-1">{text}</p>
                    <p className="post-date">
                        Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
                    </p>
                    {!auth.loading && user===auth.user._id && (
                        <button
                         onClick={()=>removeComment(postId,_id)}
                         type="button"
                         className="btn btn-danger"
                        >
                            <i className="fas fa-times"/>
                        </button>
                    )}
                </div>

            </div>
        )
}

const mapStateToprops=state=>({
    auth:state.auth
})
export default connect(mapStateToprops,{removeComment})(CommentItem)