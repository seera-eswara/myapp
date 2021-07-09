
// import React from "react";
// import logo from "./logo.svg";
import {Switch, Route} from 'react-router-dom'
import "./App.css";
import LoginForm from './components/LoginForm'
import RegisterUserForm from './components/RegisterUserForm'
import Home from './components/Home'
import Products from './components/Products';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import WrapperCompnent from './components/WrapperComponent';


const  App = () => (
    <Switch>
    <Route exact path="/login" component={LoginForm}/>
    <Route exact path="/register" component={RegisterUserForm}/>
    <WrapperCompnent exact path="/" component={Home} />
    <WrapperCompnent exact path="/Products" component={Products} />
    <WrapperCompnent exact path="/Cart" component={Cart} />
    <NotFound/>
    </Switch>


)
  


export default App;




// import React,{useState,useEffect} from 'react'

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   const [data,setData] = useState(null);
// useEffect(() => {
//   fetch('/')
//   .then((res) => res.json())
//   .then( (data) =>  console.log(data))
// },[])

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//        <p>{data}</p>
//       </header>
//     </div>
//   );
// }

// export default App;
