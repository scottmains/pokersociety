import React, { useRef, useState } from 'react';

import './chat.css'
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import useAuth from "../../context/Auth/useAuth";




firebase.initializeApp({
  apiKey: "AIzaSyBNSnoIJTrU8AuIJ98muNmJaEjv3pP12kg",
  authDomain: "groupchat-6dfaa.firebaseapp.com",
  databaseURL: "https://groupchat-6dfaa-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "groupchat-6dfaa",
  storageBucket: "groupchat-6dfaa.appspot.com",
  messagingSenderId: "235621123712",
  appId: "1:235621123712:web:f9747ecb1efdc64bf08865",
  measurementId: "G-V233L1J3S0"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();


function ChatComponent() {

  const [user] = useAuthState(auth);

  return (
    <div className="Chat">
      {/* <div className="chatHeader">
        <h1>⚛️🔥💬</h1>
     </div> */}

      <section>
       {/*  {user ? <ChatRoom /> : <SignIn />} */}
       <ChatRoom/>
      </section>

    </div>
  );
}

/* function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )

} */


// function SignOut() {
//   return auth.currentUser && (
//     <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
//   )
// }


function ChatRoom() {
    
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const {userDetails } = useAuth();
const obj = JSON.stringify(userDetails)
const user = JSON.parse(obj)
console.log(userDetails)


  const sendMessage = async (e) => {
    e.preventDefault();

/*     const { uid, photoURL } = {user.name};
 */
    const uid = user.name;
    const photoURL = user.name;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
  <>
    <div>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </div>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}> Send </button>

    </form>
  </>)
}


function ChatMessage(props) {
    const {userDetails } = useAuth();
    const obj = JSON.stringify(userDetails)
    const user = JSON.parse(obj)
    console.log(userDetails)

  const { text, uid, photoURL } = props.message;

  const messageClass = uid === user.name ? 'sent' : 'received';

  return (<>
 
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      
      <p>{text}</p>
    </div>
  </>)
}

// function ChatMessage(props) {
//   const { text, uid } = props.message;

//   return <p>{text}</p>
// }


export default ChatComponent;
