import {Component} from 'react'
import './index.css'




// Cookie expiry in mins 

// For 30 seconds, you can use:

// var date = new Date();
// date.setTime(date.getTime() + (30 * 1000));
// $.cookie('username', username, { expires: date });  // expires after 30 second


class RegisterUserForm extends Component{
    state = {username:'',password:'',confirmPassword:'' ,isError: false,errorMsg:''}

    getUserName = event =>{

this.setState({username: event.target.value})
    }

    getUserPassowrd = event =>{
        
        this.setState({password: event.target.value})
            }

getUserConfirmPassowrd  = event =>{
                
                this.setState({confirmPassword: event.target.value})
                    }

formSubmit = async event =>{
    event.preventDefault();

    const {username,password,confirmPassword} = this.state
    const { history} = this.props
    const userDetails = {username,password}
    if(username === "" && password==="" && confirmPassword === "") {
        this.setState({isError: true, errorMsg: "UserName and Password fields cannot be empty"})
    }else  if (username === ""){
    this.setState({isError: true, errorMsg: "User name field cannot be empty"})
        }else if(password===""){
            this.setState({isError: true, errorMsg: "Password field cannot be empty"})
        }else if(password===""){
            this.setState({isError: true, errorMsg: "Password field cannot be empty"})
        }else if(confirmPassword === ""){
            this.setState({isError: true, errorMsg: "Confirmpassword field cannot be empty"})
        }else{
            const options ={
                method: 'POST',
               
                headers: {
                    
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNlZXJhZXN3YXIxIiwiaWF0IjoxNjIzMDMyMDA3fQ.6CUkTfT51oiFWaTi1_zQruKwn8R6TLvE1oHJlXCa-Y8'},
                },
                body: JSON.stringify(userDetails)
            }
            
            const promise = await fetch('/createUser',options)
            const response = await promise.json()
            
            if (response.success !== undefined){

                history.replace('/login')
            }else{
                this.setState({isError: true, errorMsg: response.error})
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
<div className="input-container">
<label className="label">CONFIRM PASSWORD</label>
<input type='password' onChange={this.getUserConfirmPassowrd} className='input' placeholder="Confirm Password"/>
</div>
<div className="btnCont">
<button className="bn">Register</button>
</div>
{ isError && <p className="error-message">{errorMsg}</p> }
</form>

</div>

        )
    }
}

export default RegisterUserForm