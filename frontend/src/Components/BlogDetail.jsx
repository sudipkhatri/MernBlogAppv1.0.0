import React, { useState, useEffect } from 'react'
import {Typography, Box, TextField, Button} from '@mui/material'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


function BlogDetail() {

  const navigator = useNavigate()
  const[blogs, setBlogs] = useState({});
  const id = useParams().id;
  const fetchData = async() =>{
    const res = await axios.get(`http://localhost:5001/api/blog/${id}`)
    .catch((err)=>console.log(err));
    const resData = await res.data;
    return resData;
  }
  useEffect(()=>{
    fetchData().then((data)=>{
    setInput({
    title: data.blog.title,
    description : data.blog.description,
    // image : data.blog.image,
  })
    })
  },[id])
  const[input, setInput] = useState({});

  const sendRequest = async()=>{
    const res = await axios.patch(`http://localhost:5001/api/blog/update/${id}`, {
      title : input.title,
      description : input.description,
      // image : input.image,
    }).catch((err)=>console.log(err))
    const resData = res.data;
    return resData;
  }
  const handleChange =(e)=>{
    setInput((prev)=>({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }
 const handleSubmit =(e)=>{
  e.preventDefault();
  sendRequest().then((data)=>{
    setBlogs(data.blogs)
  }).then((navigator('/myBlogs')));
  console.log(input);
 
 }
  return (
    <div>
       
      {input && <form onSubmit={handleSubmit}>
        <Box display='flex' justifyContent="center" alignItems='center' flexDirection='column'
        boxShadow='10px 10px 20px #c444' maxWidth={450} margin='50px auto' padding={3} 
        borderRadius ={4} minHeight={400}>
          <Typography variant='h2'>Update Blog</Typography>
          <TextField
          name='title'
          value={input.title}
          placeholder='Enter Title...'
          type='text'
          margin='normal' sx={{width:'90%'}}
          onChange={handleChange}
          />
          <TextField
          name='description'
          value={input.description}
          placeholder='Enter Description...'
          type='text'
          margin='normal' sx={{width:'90%'}}
          onChange={handleChange}
          />
          {/* <TextField
          name='image'
          value={input.image}
          placeholder='Enter Image...'
          type='text'
          margin='normal' sx={{width:'90%'}}
          onChange={handleChange}
          /> */}
          <Button
          variant="contained" color="success" sx={{margin: 1, borderRadius:1}} 
          type='submit'>Submit</Button>
        </Box>
      </form>
      }
    </div>
  )
}

export default BlogDetail
