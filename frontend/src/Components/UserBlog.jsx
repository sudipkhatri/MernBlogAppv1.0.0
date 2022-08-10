import {React, useEffect} from 'react'
import axios from 'axios';
import { useState } from 'react';
import Blog from './Blog';



function UserBlog() {

  const [user, setUser] = useState()
  
  const id = localStorage.getItem("userId");
  const sendRequest = async ()=>{
    const res = await axios.get(`http://localhost:5001/api/blog/user/${id}`).catch((err)=>console.log(err));
    const inData = await res.data;
    return inData;
  }
  useEffect(()=>{
    sendRequest().then((data)=>setUser(data.user))
  },[]);
  
  return (
    <div>
      {user && user.blogs && user.blogs.map((blog, index)=>{
        const{title, description, image} = blog;
        return <div key={index}>
          <Blog 
          id={blog._id}
          title={title} description={description}
          image={image} user = {user.name}
          isUser={true} 
          />
          </div>
      })}
    </div>
  )
}

export default UserBlog
