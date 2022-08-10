import {React, useState} from 'react';
import {Typography, TextField, Button} from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { authActions } from '../store';
import { useNavigate } from 'react-router-dom';

function Auth() {
  // when users login with correct credentials navigate them to specific page
  const navigator = useNavigate();
  // use to dispath action from redux-store
  const dispatch = useDispatch();
  const[input, setInput] = useState({
    name : "",
    email : "",
    password : ""
  })
  const[isSignUp, setIsSignUp] = useState(false);

  const handleChange=(e)=>{
    setInput((prev)=>({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }

  const sendRequest = async(type="login")=>{
    const res = await axios.post(`http://localhost:5001/api/user/${type}`, 
    {
      name : input.name,
      email : input.email,
      password : input.password,
    }).catch(err=>console.log(err)); 
    const datas = res.data;
    return datas;
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    // true ? from store dispatch action login then navigate to blogs from app.js log data to see 
    if(isSignUp){
      sendRequest("signup").then((data)=>localStorage.setItem("userId", data.user._id)).then(()=>dispatch(authActions.login({}))).then(navigator("/blogs")) //.then(data=>console.log(data))
    }
    else{sendRequest().then((data)=>localStorage.setItem("userId", data.user._id)).then(()=>dispatch(authActions.login({}))).then(navigator("/blogs")) //.then(data=>console.log(data))
  }

  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box 
        display="flex" justifyContent="center" alignItems='center' flexDirection='column'
        boxShadow='10px 10px 20px #c444' maxWidth={450} margin='50px auto' padding={3} 
        borderRadius ={4} minHeight={400}
        >
          <Typography variant='h3' padding={3}> 
          {isSignUp ? "signup" : "login"} 
          </Typography>
         {isSignUp && <TextField name="name" placeholder='Name...' margin='normal' sx={{width:'90%'}} onChange={handleChange}/> }
          <TextField 
          name = "email"
          type={'email'} placeholder='Email...' margin='normal' 
          sx={{width:'90%'}}
          onChange={handleChange}
          />
          <TextField
          name = "password"
          type={'password'} placeholder='Password...' margin='normal' sx={{width:'90%'}}
          onChange={handleChange}
           />
          <Button
          type='submit'
          variant="contained" color="success" sx={{margin: 1, borderRadius:1}}> 
          Submit
          </Button>
          <Button onClick={()=>setIsSignUp(!isSignUp)}>
          {isSignUp ? "Already a user? login" : "New Here? signup"}
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default Auth;
