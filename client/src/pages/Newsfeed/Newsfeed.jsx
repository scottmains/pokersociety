import PostsList from "./posts/PostsList";
import AddPostForm from "./posts/AddPostForm";
import Navbar from "../../components/Navbar/Navbar"
import React from 'react'
import Chatbot from '../../components/Chatbot/Chatbot';

const Newsfeed = () => {
  return (
   <>
   <div className="min-h-screen">
   <Navbar/>

   <div className="relative md:pt-16 pt-10 md:pb-32 flex content-center items-center justify-center ">
    <div className="bg-landing-background bg-cover bg-center absolute  top-0 w-full h-3/6 md:h-4/5   " />
    <div className="container relative mx-auto ">
        <div className="pb-44 md:pb-10 ">
          <div className="mt-3  "> 
                <h1 className="md:text-6xl text-3xl tracking-widest text-white  ">Announcements</h1> </div>
</div>
</div>
</div>
<div className="-mt-20 sm:-mt-0"> 
    <PostsList />
    </div>
    <Chatbot />
    </div>
 </>
  )
}

export default Newsfeed