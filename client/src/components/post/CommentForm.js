import React ,{useEffect,useState}from "react"
import {connect} from "react-redux"
import {addComment} from "../../actions/post"

const Commentform=({addComment,postId})=>{
    const [text,setText]=useState("")

    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Leave a Comment</h3>
            </div>
            <form
             className="form my-1"
             onSubmit={e=>{
                 e.preventDefault()
                 addComment(postId,{text})
                 setText("")
             }}
            >
                <textarea
                 name="text"
                 cols="30"
                 rows="5"
                 placeholder="ADD a Comment"
                 value={text}
                 onChange={e=>setText(e.target.value)}
                 required
                />

                <input type="submit" className="btn btn-dark my-1"/>

            </form>

        </div>
    )



}

export default connect(null,{addComment})(Commentform)