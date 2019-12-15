import React,{Fragment} from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import Moment from 'react-moment'
import {addLike,removeLike,deletePost} from "../../actions/post"


const PostItem=({showActions,deletePost,addLike,removeLike,auth,post:{_id,text,name,avatar,user,likes,comments,date}})=>(
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
            {showActions && (
                <Fragment>
                                <button onClick={()=>addLike(_id)} type="button" className='btn btn-light'>
                <i className="fas fa-thumbs-up" />{" "}
                <span>{likes.length>0 && <span>{likes.length}</span>}</span>
            </button>
            <button
            onClick={() => removeLike(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-down' />
          </button>

            <Link to={`/post/${_id}`}className="btn btn-primary">
                Discussion {" "} {comments.length>0 && <span className="comment-count">{comments.length}</span>}
            </Link>

            {!auth.loading && user===auth.user._id &&(
                <button onClick={()=>deletePost(_id)} type="button" className="btn btn-danger" >
                    <i className="fas fa-times"/>
                </button>
            )}
                </Fragment>
            )}
        </div>

    </div>
)
PostItem.defaultProps = {
    showActions: true
  };

const mapStateToProps=state=>({
    auth:state.auth
})
export default connect(mapStateToProps,{addLike,removeLike,deletePost})(PostItem)