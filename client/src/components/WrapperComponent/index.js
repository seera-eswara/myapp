
import Cookies  from "js-cookie";
import { Route,Redirect} from 'react-router-dom'
import {} from 'react-router-dom'
const WrapperCompnent = props => {

    const jwt_token = Cookies.get('jwt_token')


    
    if(jwt_token === undefined){
        
      return  <Redirect  to="/login"/>
    }
    else{


        
        return ( <Route {...props} />)
    }

    

}

export default WrapperCompnent