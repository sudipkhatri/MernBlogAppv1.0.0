import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Blog from './Blog';

function Blogs() {
  const [blogs, setBlogs] = useState()
  const sendRequest = async ()=>{
    const res = await axios.get("http://localhost:5001/api/blog").catch((err)=>console.log(err));
    const recievedData = await res.data;
    return recievedData;

  }
  useEffect(()=>{
    sendRequest().then((data)=>setBlogs(data.blogs))
  }, []);
  //console.log(blogs);
  return (
    <div>
      {blogs && blogs.map((blog, index)=>{
        const{title, description, image} = blog;
        return <div key={index}>
          <Blog 
          id = {blog._id}
          title={title} description={description}
          image={image} user={blog.user.name}
          isUser={blog.user._id === localStorage.getItem("userId")}
           />
          </div>
      })}
    </div>
  )
}

export default Blogs
