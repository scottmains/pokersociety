import React from "react";
import "./Newsfeed.css";
import Navbar from "../../components/Navbar/Navbar"
import { useState, useEffect } from "react";

/**

 * 
 * @author Scott Mains
 */


 const Feed = () => {

  const [post, setPost] = useState()
  return (

     <div className="feed">
        <div className="post text-center">
        <Post content="This is my first post!" />
        <Post content="This is my second post!" />
        </div>
      </div>
  )
}

const Post = ({content}) => {

  return (
   
  
    <div className="post">
   
  </div>
  
  )
}


const Newsfeed = () => {

  return (

    <div>
    <Navbar />
    <Feed />
  </div>
  )
}


 
export default Newsfeed;