
import React,{Fragment,useState} from "react"
import {connect} from "react-redux"
import {Link,Redirect} from "react-router-dom"
import Axios from "axios"
import {setAlert} from "../../actions/alert"
import {login} from "../../actions/auth"
import PropTypes from "prop-types"



const Login=({login,isAuthenticated})=>{
    const [formData,setFormData]=useState({
        email:"",
        password:""
    })

    const {email,password}=formData

    const onChange=e=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const onSubmit=async e=>{
        e.preventDefault()
        login(email,password)

       
    }
    if(isAuthenticated){
        return <Redirect to="/dashboard"/>
    }
return(
    <Fragment>
        <h1 className="large text-primary">Login</h1>
        <p className="lead">
            <i className="fas fa-user"/> Sign in to your Account
        </p>
        <form className="form" onSubmit={e=>onSubmit(e)}>
            <div className="form-group">
                <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={e=>onChange(e)}
                />
            </div>
          <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
       
        <input type="submit" className="btn btn-primary" value="Login"/>
        </form>
        <p className='my-1'>
        Dont have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
)
}

const mapStateTopProps=(state)=>{
    return {
        isAuthenticated:state.auth.isAuthenticated
    }
}
export default connect(mapStateTopProps,{login})(Login)