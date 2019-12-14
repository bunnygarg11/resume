import React,{Fragment} from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import Moment from 'react-moment'
import moment from "moment"

const PostItem=({auth,post:{_id,text,name,avatar,user,likes,comments,date}})=>(
    <div className="post bg-white p-1 my-1">
        <div>
            <Link to={`/profile/${user}`}>
                <img className="round-img" src={avatar} alt=""/>
            </Link>
        </div>
        <div>
            <p>{text}</p>
            <p>
            Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
            </p>
            <button type="button" className="btn btn-primary">
                <i className="fas fs-thumps-up" />{" "}
                <span>{likes.length>0 && <span>{likes.length}</span>}</span>
            </button>

            <Link to={`/post/${_id}`}className="btn btn-primary">
                Discussion <span className="comment-count">{comments.length>0 && <span>{comments.length}</span>}</span>
            </Link>

            {!auth.loading && user===auth.user._id &&(
                <button type="button" className="btn btn-danger" >
                    <i className="fas fa-times"/>
                </button>
            )}
        </div>

    </div>
)

const mapStateToProps=state=>({
    auth:state.auth
})
export default connect(mapStateToProps)(PostItem)