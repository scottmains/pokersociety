import React from 'react'
import './profile.css'
import Navbar from "../../components/Navbar/Navbar"
import { useState, useContext } from 'react';
import useAuth from "../../context/Auth/useAuth";

const Profile = () => {


   
    const {userDetails } = useAuth();
    const obj = JSON.stringify(userDetails)
    const user = JSON.parse(obj)
    console.log(userDetails)


  return (
    <div>
    <Navbar />

    <div className="h-screen bg-gray-300">
    <div className="container flex justify-center py-20 mx-auto">
        <div className="p-5 bg-white mx-auto w-1/3 rounded-xl max-w-lg hover:shadow">
            <div className="flex justify-between w-full text-center"> 
                <div className="ml-2 ">
                    <div className="p-3">
                        <h3 className="text-2xl"> {user.name}</h3> 
                        <span>  {user.email}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-200 rounded-lg">
                        <div className="mr-3"> <span className="text-gray-400 block">Wins</span> 
                        <span className="font-bold text-black text-xl">{user.wins}</span> </div>
                        <div className="mr-3"> <span className="text-gray-400 block">Losses</span> 
                        <span className="font-bold text-black text-xl">{user.losses}</span> </div>
                        <div> <span className="text-gray-400 block">Ratio</span> 
                        <span className="font-bold text-black text-xl">0</span> </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mt-2 gap-2"><button className="w-full h-12 rounded-md bg-blue-700 text-white text-md hover:shadow hover:bg-blue-800">Chat</button> </div>
        </div>
    </div>
</div>
  </div>
  )
}

export default Profile