import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFbSingIn, handleGoogleSingIn, handleSingOut, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';



function Login() {
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  })

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext)

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSingIn = () =>{
    handleGoogleSingIn()
    .then(res => {
      handleResponse(res, true); 
    })
  }

  const fbSingIn = () =>{
    handleFbSingIn()
    .then(res => {
      handleResponse(res, true);
    })
  }

  const singOut = () =>{
    handleSingOut()
    .then(res => {
      handleResponse(res, false);
    })
    }
 
  const handleBlur= (e) => {
      
      let isFieldValid = true;
      if(e.target.name === 'email'){
         isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
         }
      if(e.target.name === 'password'){
        const isPasswordValid = e.target.value.length > 6;
        const isPasswordHas = /^(?=.{6,20}$)\D*\d/.test(e.target.value)
        isFieldValid= isPasswordHas && isPasswordValid
      }
     if(isFieldValid){  
        // const [...cart, newItem]
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
     }
  }

const handleResponse = (res, redirect) => {
  setUser(res);
      setLoggedInUser(res);
      if (redirect){
        history.replace(from);
      }
}


  const handleSubmit= (e) => {
        if(newUser && user.email && user.password){
          createUserWithEmailAndPassword( user.name, user.email, user.password) 
          .then(res => {
            handleResponse(res, true);
        })
      }
        if(!newUser && user.email && user.password){
          signInWithEmailAndPassword(user.email, user.password)
          .then(res => {
            handleResponse(res, true);
        })
        }

        e.preventDefault();
  }
    
  return (
    <div style={{textAlign: 'center'}}>
   
   
      {
        user.isSignedIn ? <button onClick={singOut }>Sign Out</button> :<button onClick={googleSingIn }>Sign in</button>
      }
      <br/>
      <button onClick={fbSingIn}>Sing in with Facebook</button>
      {
        user.isSignedIn && <div>     
          <p>Welcome, {user.name} </p>
          <p>Your Email: {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
     }

        <h1>Our Own Authentication System</h1>
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
        <label htmlFor="newUser">NewUser singUp </label>
        <form onSubmit={handleSubmit}>
       {newUser &&  <input type="text" name="name" onBlur={handleBlur} placeholder="Put your Name"/>}
        <br/>
          <input type="text" name="email" onBlur={handleBlur} placeholder="Put your email address" required/>
          <br/>
          <input type="password" name="password" onBlur={handleBlur} placeholder="Set password"  required/>  
          <br/>
          <input type="submit" value={newUser ?'Sing up':'Sing in'}/>
        </form>
      <p style={{color: 'red'}}>{user.error}</p>
      {user.success && <p style={{color: 'green'}}>User {newUser ?'created':'Logged in'} successfully</p>}
    </div>
  );
}

export default Login;
