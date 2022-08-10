import React from 'react'
import {Typography, Box, Button} from '@mui/material';

function Home() {
  return (
    <div>
      <Box>
        <Typography variant='h2'>Welcome TO Blog</Typography>
        <Button>Already a user ? Login</Button>
        <Button> New Here ? SignUp</Button>
      </Box>
    </div>
  )
}

export default Home
