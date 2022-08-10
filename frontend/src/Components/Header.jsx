import {React, useState} from 'react'
import {AppBar, Button, Tab, Tabs, Toolbar, Typography} from '@mui/material';
import { Box } from '@mui/system';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { authActions } from '../store';

function Header() {
    const dispatch = useDispatch();
    const[value, setValue] = useState(0);
    const isLoggedIn = useSelector((state)=>state.isLoggedIn);
  return (
    <AppBar position='sticky' sx={{background : "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)"}}>
        <Toolbar>
            <Typography variant='h4' >App</Typography>
            {isLoggedIn && <Box display='flex' marginLeft={'auto'} marginRight={'auto'}>
                <Tabs textColor='inherit' value={value} onChange={(e, val)=>{setValue(val); console.log(e)}}>
                    <Tab LinkComponent={Link} to='/blogs' label='All Blogs' ></Tab>
                    <Tab LinkComponent={Link} to='/myBlogs' label='My Blogs' ></Tab>
                    <Tab LinkComponent={Link} to='/blogs/add' label='Add Blog' ></Tab>
                </Tabs>
            </Box>}
            <Box display='flex' marginLeft='auto'>
                {!isLoggedIn && <><Button
                LinkComponent={Link} to='/Auth'
                 variant="contained" color="success" sx={{margin: 1, borderRadius:8}}>
                    Login
                </Button>
                <Button 
                LinkComponent={Link} to='/Auth'
                variant="contained" color="success" sx={{margin: 1, borderRadius:8}}>
                    SignUp
                 </Button>
                 </>}
               { isLoggedIn && <Button
                onClick={()=>dispatch(authActions.logout())}
                LinkComponent={Link} to='/Auth'
                variant="contained" color="success" sx={{margin: 1, borderRadius:8}}>
                LogOut
                </Button> }
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Header
