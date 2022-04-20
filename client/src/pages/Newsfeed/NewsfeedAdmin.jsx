import PostsList from "./posts/PostsList";
import AddPostForm from "./posts/AddPostForm";
import Navbar from "../../components/Navbar/Navbar"
import React from 'react'
import Chatbot from '../../components/Chatbot/Chatbot';

const Newsfeed = () => {
  return (
   <>
   <Navbar/>
    <PostsList />
    <AddPostForm />
    <Chatbot />
 </>
  )
}

export default Newsfeed