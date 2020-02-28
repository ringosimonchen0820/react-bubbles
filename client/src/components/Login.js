import React, { useEffect, useState } from "react";
import axios from 'axios';

const Login = (props) => {
  const [state, setState] = useState('')

  const handleChange = e => {
    e.preventDefault();
    setState({...state,[e.target.name]: e.target.value})
  }
  console.log(state)
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const login = e => {
    e.preventDefault()
  
// make a POST request to the server
// the server will "authenticate" the user based on their credentials
// If they can be authenticated the server will return a token
    axios.post('http://localhost:5000/api/login', state)
    .then(res => {
        localStorage.setItem('token', res.data.payload);
       
        props.history.push('/bubblePage');
    })
    .catch(err => console.log(err));
}

  return (
    <>
      <form onSubmit={login}>
      <h1>Welcome to the Bubble App!</h1>
        <input
        type="text"
        name='username'
        placeholder='Username'
        value={state.name}
        onChange={handleChange}
        />
         <input
        type="password"
        name='password'
        placeholder='password'
        value={state.name}
        onChange={handleChange}
        />
        <button> Submit</button>
       </form> 
    </>
  );
};

export default Login;
