import {React, useEffect} from 'react';
import {Card, Box,  CardHeader, CardMedia, Avatar, Typography, CardContent, IconButton} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Blog({title, description, image, user, isUser, id}) {

  const navigate = useNavigate();

  const handleEdit =(e)=>{
    navigate(`/myBlogs/${id}`)
  }
  const deleteRequest = async()=>{
      const res = await axios.delete(`http://localhost:5001/api/blog/${id}`).catch((err)=>console.log(err));
      const data = await res.data;
      return data;
    }
  const handleDelete = ()=>{  
    deleteRequest().then(()=>navigate('/myBlogs'));
  }
  return (
    <div>
      <Card sx={{
         maxWidth: 345,
         margin : 'auto',
         mt : 2,
         padding : 2,
         borderRadius : 8,
         boxShadow:'10px 5px 10px #c444',
         ":hover":{
            boxShadow : '10px 10px 20px #c444'
         },
         }}>
          {isUser && (
              <Box display='flex'>
                <IconButton onClick={handleEdit} sx={{marginLeft:'auto' }}><EditIcon/></IconButton>
                <IconButton onClick={handleDelete}><DeleteOutlineIcon/></IconButton>
              </Box>
            )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'red' }}>
            {user}
          </Avatar>
        }
        title={title}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="404"
      />
      <CardContent>
        <hr/>
        <br/>
        <Typography variant='body2' color="text.secondary">
         <b> {user.toUpperCase()} </b> {" : "} {description}
        </Typography>
      </CardContent>
    </Card>
    </div>
  )
}

export default Blog
