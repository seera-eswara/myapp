import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import { json } from 'express'

class LoginForm extends Component{
    state = {username:'',password:'',isError: true}

    getUserName = event =>{
console.log(event.target.value)
this.setState({username: event.target.value})
    }

    getUserPassowrd = event =>{
        console.log(event.target.value)
        this.setState({password: event.target.value})
            }
        
formSubmit = async event =>{

    event.preventDefault();
    const {username,password} = this.state
    const userDetails = {username,password}
    const options ={
        'method': 'POST',
        'Content-Type': 'application/json',
        'headers': {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNlZXJhZXN3YXIxIiwiaWF0IjoxNjIzMDMyMDA3fQ.6CUkTfT51oiFWaTi1_zQruKwn8R6TLvE1oHJlXCa-Y8'},
        'body': json.stringify(userDetails)
    }

    const promise = await fetch('/login',options)
    const data = await promise.json()
    console.log('formsubmit',data)
}

    render(){
        const {isError} = this.state
        console.log('iserrror',isError)
        return(


<div className="loginHomeCont">
<img className="smallLogo" alt="website logo" src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png "/>
<img className="image" alt="website login" src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"/>
<form onSubmit={this.formSubmit} className="loginFormCont">
<div className="input-container">
<img className="desktopLogo" alt="website logo" src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png "/>
<label className="label">USERNAME</label>
<input onChange={this.getUserName} className='input' placeholder="Username"/>
</div>
<div className="input-container">
<label className="label">PASSWORD</label>
<input onChange={this.getUserPassowrd} className='input' placeholder="Password"/>
</div>

<button className="bn">Login</button>
{ isError && <p className="error-message"></p> }
</form>

</div>

        )
    }
}

export default LoginForm