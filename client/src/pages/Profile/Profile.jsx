import React from 'react'
import './profile.css'
import Navbar from "../../components/Navbar/Navbar"
import { useState, useContext } from 'react';
import useAuth from "../../context/Auth/useAuth";
import Avatar from 'react-avatar';
import Chatbot from '../../components/Chatbot/Chatbot';


const Profile = () => {


   
    const {userDetails } = useAuth();
    const obj = JSON.stringify(userDetails)
    const user = JSON.parse(obj)
    console.log(userDetails)
   
    const wins = parseFloat(user.wins)
    const losses= parseFloat(user.losses)

    let ratio = ""
    if (losses === 0) {
    ratio =  wins / 1
    } else {
    ratio = wins / losses
    }

   

  return (
    <>
    <Navbar />
   
    <div className="relative md:pt-16 md:pb-32 flex content-center items-center justify-center ">
    <div className="bg-landing-background bg-cover bg-center absolute  top-0 w-full h-3/6 md:h-4/5   " />
    <div className="container relative mx-auto ">
        <div className="pb-44 md:pb-10 ">
          <div className="mt-3  "> 
                <h1 className="md:text-6xl text-3xl tracking-widest text-white pt-10 ">Profile</h1> </div>
                </div>
    </div>
    </div>
    <div className="container flex justify-center mx-auto text-white">
        <div className="p-5 bg-green-700 mx-auto md:w-1/3 w-4/5 rounded-xl max-w-lg hover:shadow">
            <div className="justify-between w-full text-center"> 
                <div className="ml-2">
                    <div className="p-3 ">
                    <Avatar name={user.name} round={true} />
                        <h3 className="text-2xl pt-4"> {user.name}</h3> 
                        <span>  {user.email}</span>
                    </div>
                    <div className="flex w-2/3 mx-auto justify-between items-center p-3  rounded-lg">
                        <div className="mr-3"> <span className="text-white block">Wins</span> 
                        <span className="font-bold text-xl">{user.wins}</span> </div>
                        <div className="mr-3"> <span className=" block">Losses</span> 
                        <span className="font-bold  text-xl">{user.losses}</span> </div>
                        <div> <span className="block">Ratio</span> 
                        <span className="font-bold  text-xl">{ratio}</span> </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    <Chatbot/>
 </>
  )
}

export default Profile
