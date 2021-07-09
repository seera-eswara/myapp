import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'



class LoginForm extends Component{
    state = {username:'',password:'',isError: false,errorMsg:''}

    getUserName = event =>{

this.setState({username: event.target.value})
    }

    getUserPassowrd = event =>{
        
        this.setState({password: event.target.value})
            }

    register = () => {
        const {history} = this.props
        history.replace('/register')
    }
        
formSubmit = async event =>{

    event.preventDefault();
    const {username,password} = this.state
    const userDetails = {username,password}
    const {history} = this.props

if(username === "" && password==="") {
    this.setState({isError: true, errorMsg: "UserName and Password field cannot be empty"})
}else  if (username === ""){
this.setState({isError: true, errorMsg: "User name field cannot be empty"})
    }else if(password===""){
        this.setState({isError: true, errorMsg: "Password field cannot be empty"})
    } else {



    const options ={
        method: 'POST',
       
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNlZXJhZXN3YXIxIiwiaWF0IjoxNjIzMDMyMDA3fQ.6CUkTfT51oiFWaTi1_zQruKwn8R6TLvE1oHJlXCa-Y8'},
        },
        body: JSON.stringify(userDetails)
    }
    
    const promise = await fetch('/login',options)
    const data = await promise.json()
    const {jwtToken,error} = data
    
    if(jwtToken !== undefined){
    Cookies.set("jwt_token",jwtToken,{expires:1})
    history.replace('/')
    }else{
        this.setState({isError: true, errorMsg: error})
    }

}
}

    render(){
        const {isError,errorMsg} = this.state
        
        return(


<div className="loginHomeCont">
<img className="smallLogo" alt="website logo" src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png "/>
<img className="image" alt="website login" src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"/>
<form onSubmit={this.formSubmit} className="loginFormCont">
<div className="input-container">
<img className="desktopLogo" alt="website logo" src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png "/>
<label className="label">USERNAME</label>
<input type='text' onChange={this.getUserName} className='input' placeholder="Username"/>
</div>
<div className="input-container">
<label className="label">PASSWORD</label>
<input type='password' onChange={this.getUserPassowrd} className='input' placeholder="Password"/>
</div>
<div className="btnCont">
<button type='submit' className="bn">Login</button>
<button type="button" onClick={this.register} className="bn">Register</button>
</div>
{ isError && <p className="error-message">{errorMsg}</p> }
</form>

</div>

        )
    }
}

export default LoginForm