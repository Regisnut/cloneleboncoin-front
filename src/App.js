import React, {useState} from 'react';
import './styles/style.scss';
import Header from "./components/Header"
import Footer from "./components/Footer"
import Offers from "./containers/Offers"
import Offer from "./containers/Offer"
import Publish from "./containers/Publish"
import Payment from "./containers/Payment"
import Login from "./containers/Login"
import SignUp from "./containers/SignUp"
import Sidebar from "./containers/Sidebar"
import Backdrop from "./utils/Backdrop"
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import Cookies from "js-cookie";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faChevronRight,
  faChevronLeft,
  faHeart,
  faSortUp,
  faPlusSquare,
  faUserAlt,
  faSignInAlt,
  faEye,
  faEyeSlash,
  faClock,
  faBell

} from "@fortawesome/free-solid-svg-icons";
library.add(  faBell,faClock,faEye,
  faEyeSlash,faSignInAlt,faPlusSquare,
  faUserAlt,faSearch, faChevronRight, faChevronLeft, faHeart, faSortUp);

function App() {
  //check token in cookies
  let token = Cookies.get("token");
  const[tokenUser, setTokenUser] = useState(token ? token : null)
  let username = Cookies.get("username");
  const [name, setName] = useState(username?username : null)

  const [toggle, setToggle]=useState(false)
const backdropClickHandler = () =>{
  setToggle(false);
}

  return (
    <>
    <Router>
    <Header setToggle={setToggle} setTokenUser={setTokenUser} tokenUser={tokenUser} name={name} setName={setName}/>
    {toggle &&
    <>
<Sidebar  toggle={toggle} setToggle={setToggle} setTokenUser={setTokenUser} tokenUser={tokenUser} name={name} setName={setName}></Sidebar>
<Backdrop backdropClickHandler={backdropClickHandler}></Backdrop>
</>
} 
 <Switch>
 <Route exact path="/">
    <Offers/>
  </Route>

  <Route exact path="/signup">
    <SignUp setTokenUser={setTokenUser} setName={setName}/>
  </Route>
  <Route exact path="/login">
    <Login
    setTokenUser={setTokenUser} tokenUser={tokenUser} name={name} setName={setName}/>
  </Route>

  <Route exact path="/publish">
<Publish tokenUser={tokenUser}/>
  </Route>

  <Route path="/offer/:id">
    <Offer tokenUser={tokenUser}/>
  </Route>
 
  <Route path="/payment">
          <Payment tokenUser={tokenUser} name={name}/>
        </Route>
    
 </Switch>
   <Footer/>
   </Router>
    </>
  );
}

export default App;
