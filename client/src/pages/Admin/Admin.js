
import Navbar from "../../components/Navbar/Navbar";
import React, { useState } from 'react';
import axios from "axios";
import { useEffect} from "react";
import UsersExcerpt from "./UsersExcerpt";

const Admin = () => {

  const [allUsers, setAllUsers] = useState('')

  
    
useEffect(() => {
  async function fetchMyAPI() {
    const response = await axios.get('http://localhost:5000/api/admin/getAllUsers');
    const json = await response.json();
    setAllUsers(json.data)
  }

  fetchMyAPI()
}, [])


console.log(allUsers)

let content; 
content = (
  <div>
{allUsers.map(user => <UsersExcerpt key={user._id} user={user} />)}
</div>
) 

  return (
   <>
   <Navbar/> 
   {content}
   </>
  )
}

export default Admin