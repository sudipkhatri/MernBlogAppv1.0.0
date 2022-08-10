import React from 'react'
import axios from 'axios'
import {Box, Typography, TextField, Button} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddBlog() {
  const navigator = useNavigate();
  const[input, setInput] = useState({
    title : "",
    description : "",
    image : "",
  })
  const handleChange =(e)=>{
    setInput((prev)=>({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }
  const sendRequest = async()=>{
    const res = await axios.post("http://localhost:5001/api/blog/add",{
      title : input.title,
      image : input.image,
      description: input.description,
      user: localStorage.getItem("userId"),
    }).catch((err)=>console.log(err))

    const data = res.data;
   // console.log(data);
    return data;
  }

  const handleSubmit =(e)=>{
    e.preventDefault();
    console.log(input);
    sendRequest().then(()=>navigator('/myBlogs'));
    setInput({
    title : "",
    description : "",
    image : "",
  })
    

  }

  return (
    <div>
      <form  onSubmit={handleSubmit}>
        <Box 
        display="flex" justifyContent="center" alignItems='center' flexDirection='column'
        boxShadow='10px 10px 20px #c444' maxWidth={450} margin='50px auto' padding={3} 
        borderRadius ={4} minHeight={400}
        >
          <Typography variant='h2'>Add Blog</Typography>
          <Typography>Title</Typography>
          <TextField 
          value={input.title}
          name="title" onChange={handleChange}
          margin ="normal" sx={{width:'90%'}}
          />
          <Typography>Description</Typography>
          <TextField
          value={input.description} 
          name="description" onChange={handleChange}
          margin ="normal" sx={{width:'90%'}}
          />
          <Typography>Image</Typography>
          <TextField
          value={input.image}
          name="image" onChange={handleChange}
          margin ="normal" sx={{width:'90%'}}
          />
          <Button 
          type='submit'variant="contained"
          color="success" sx={{margin: 1, borderRadius:1}}
          >
          Submit
          </Button>
        </Box>

      </form>
    </div>
  )
}

export default AddBlog
