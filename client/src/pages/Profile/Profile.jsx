import React from 'react'
import './profile.css'
import Navbar from "../../components/Navbar/Navbar"
import { useState, useContext } from 'react';

const Profile = () => {
  return (
    <div>
    <Navbar />

    <div class="h-screen bg-gray-300">
    <div class="container flex justify-center py-20 mx-auto  ">
        <div class="p-10 bg-white rounded-xl max-w-lg hover:shadow">
            <div class="flex justify-between w-full"> 
                <div class="ml-2">
                    <div class="p-3">
                        <h3 class="text-2xl">Insert Name</h3> <span> Insert Email</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-gray-200 rounded-lg">
                        <div class="mr-3"> <span class="text-gray-400 block">Wins</span> <span class="font-bold text-black text-xl">3</span> </div>
                        <div class="mr-3"> <span class="text-gray-400 block">Losses</span> <span class="font-bold text-black text-xl">3</span> </div>
                        <div> <span class="text-gray-400 block">Ratio</span> <span class="font-bold text-black text-xl">1</span> </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-between items-center mt-2 gap-2"><button class="w-full h-12 rounded-md bg-blue-700 text-white text-md hover:shadow hover:bg-blue-800">Chat</button> </div>
        </div>
    </div>
</div>
    
  </div>
  )
}

export default Profile