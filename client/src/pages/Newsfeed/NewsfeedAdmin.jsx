import PostsListAdmin from "./posts/PostsListAdmin";
import AddPostForm from "./posts/AddPostForm";
import Navbar from "../../components/Navbar/Navbar"
import React from 'react'
import Chatbot from '../../components/Chatbot/Chatbot';

const Newsfeed = () => {
  return (
   <>
   <Navbar/>
   <AddPostForm />
    <PostsListAdmin />
    <Chatbot />
 </>
  )
}

export default Newsfeed