import './App.css';
import {React, useEffect} from 'react'
import Header from './Components/Header';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Auth from './Components/Auth';
import Blogs from './Components/Blogs';
import UserBlog from './Components/UserBlog';
import BlogDetail from './Components/BlogDetail';
import AddBlog from './Components/AddBlog';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from './store';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state)=>state.isLoggedIn);
  const navigate = useNavigate();
  // this is for the page refresh each time pages refreshes if userId is in local storage user is still logged in
  useEffect(()=>{
    if(localStorage.getItem("userId")){
      dispatch(authActions.login())
    }
  },[dispatch]);
   
  return (
    <>
      <Header>
        <Header />
      </Header>
      
      <main>

        <Routes>
          {!isLoggedIn ? <Route path="/auth" element={<Auth />} /> :
          <>
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/myBlogs" element={<UserBlog />} />
          <Route path="/myBlogs/:id" element={<BlogDetail />} />
          <Route path="/blogs/add" element={<AddBlog/>} />
          </>
          }
        </Routes>
      </main>
    </>
  );
}

export default App;
