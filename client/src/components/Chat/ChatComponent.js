import React, { useRef, useState } from 'react';
import './chat.css';
import useAuth from "../../context/Auth/useAuth";

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// firebase.initializeApp({
//   apiKey: "AIzaSyBNSnoIJTrU8AuIJ98muNmJaEjv3pP12kg",
//   authDomain: "groupchat-6dfaa.firebaseapp.com",
//   databaseURL: "https://groupchat-6dfaa-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "groupchat-6dfaa",
//   storageBucket: "groupchat-6dfaa.appspot.com",
//   messagingSenderId: "235621123712",
//   appId: "1:235621123712:web:f9747ecb1efdc64bf08865",
//   measurementId: "G-V233L1J3S0"
// })

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();



export default function ChatComponent() {

  const [user] = useAuthState(auth);

  
  const {userDetails } = useAuth();
  const obj = JSON.stringify(userDetails)
  const local_user = JSON.parse(obj)

  
  if(!user)
  {
    auth.signInWithEmailAndPassword(local_user.email,local_user.email);
  }
  

  // const {userDetails } = useAuth();
  // const obj = JSON.stringify(userDetails)
  // const user = JSON.parse(obj)


  // console.log(userDetails)
  // console.log(user)

  return (
    <div className="Chat">
      <header>
        <h1>⚛️🔥💬 WELCOME TO CHAT ROOM</h1>
        {/* <SignOut /> */}
      </header>

      
        {<ChatRoom />}
      

    </div>
  );
}



// function SignIn() {

//   return (
//     userDetails?.user ? <ChatRoom /> : <>
//     <button className="sign-in" onClick={signInWithEmailAndPassword}>Enter into Chatroom</button>
//     <p>Do not violate the community guidelines or you will be banned for life!</p>
//   </>
    
//   )

// }

// function SignOut() {
//   return auth.currentUser && (
//     <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
//   )
// }


function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt','desc');

  const [messages] = useCollectionData(query, { idField: 'id' });
  console.log(messages)
  const [formValue, setFormValue] = useState('');

  const {userDetails } = useAuth();
  const obj = JSON.stringify(userDetails)
  const user = JSON.parse(obj)

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    
    
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      name: user.name,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
  <div className='chatWindow'>
    <div className='scrolldiv'>

      {messages && messages.reverse().map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </div>

    <form onSubmit={sendMessage} className='sendMessage'>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button className = "text-center" type="submit" disabled={!formValue}>Send</button>

    </form>
  </div>)
}


function ChatMessage(props) {
  const { text, uid, photoURL, name } = props.message;

  const {userDetails } = useAuth();
  const obj = JSON.stringify(userDetails)
  const user = JSON.parse(obj)
  // console.log(userDetails)

  console.log(auth)
  
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
  return (<>
    <div className={`message ${messageClass}`}>
      <a>{name}</a>
      <p>{text}</p>
    </div>
  </>)
}