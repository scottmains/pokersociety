import { Widget, addResponseMessage } from 'react-chat-widget';
import React, {useEffect } from 'react'
import Answers from './Answers';
import Utterances from './Utterances';
import Alternatives from './Alternatives';
import 'react-chat-widget/lib/styles.css';
import botIcon from "../../botIcon.png"
import "./../../app.css"
import useAuth from "../../context/Auth/useAuth";


const jokeURL = "https://api.chucknorris.io/jokes/random";

function Chatbot() {

 

  useEffect(() => {
    addResponseMessage(`Hi I'm pokerBot. Can I help you? 
     - for command list type 'help'`);
  }, []);

  const {userDetails} = useAuth();
        

   const handleNewUserMessage = async (newMessage) => {

    let product;
      let text = newMessage.toLowerCase().replace(/[^\w\s\d]/gi, "");
      text = text
        .replace(/ a /g, " ")
        .replace(/whats/g, "what is")
        .replace(/please /g, "")
        .replace(/ please/g, "")
        .replace(/ the/g, "")
        .replace(/ the /g, "")
        .replace(/the /g, "")
        .replace(/r u/g, "are you");


        if((text === "help")||(text === "Help")){
        
         
         addResponseMessage(`You can try:
          When is the next game,
          How many wins I have,
          How much is buy-in,
          List of poker hands,
          Who is the top player,
          Value of chips,
          joke
         `);
          return;
          }

          if((((text.includes("when is"))||(text.includes("When is")))&&((text.includes("game"))||((text.includes("next game")))))){
        
            
           addResponseMessage(`Next game is on Tuesday 23th at 19:00pm in TR3`);
            return;
            }  

            if((((text.includes("where is"))||(text.includes("Where is")))&&((text.includes("TR"))||((text.includes("tr")))))){
        
             
             addResponseMessage(`TR stands for training room and is located in Student union building on the ground floor`);
              return;
              } 
              
              if((((text.includes("who is"))||(text.includes("Who is")))&&((text.includes("best player"))||((text.includes("top player")))))){
        
                
               addResponseMessage(`You are!`);
                return;
                } 

                if((((text.includes("how much"))||(text.includes("How much")))&&((text.includes("buy in"))||((text.includes("buy-in")))))){
        
                  
                 addResponseMessage(`Buy in: £2.50
                 re-buy: £1.50 (available for first hour)`);
                  return;
                  } 

                if((((text.includes("value"))||(text.includes("Value")))&&(text.includes("chips")))){
        
                  
                 addResponseMessage(`Chip value
                 white: 10
                 red: 20
                 green: 50
                 blue: 100
                 black: 500
                 `);
                  return;
                  } 

                if((((text.includes("list"))||(text.includes("List")))&&(text.includes("hands")))){
        
                  
                 addResponseMessage(`From highest to lowest
                 1. Royal Flush 
                 2. Straight Flush 
                 3. Four of a kind 
                 4. Full house 
                 5. Flush 
                 6. Straight 
                 7. Three of a kind 
                 8. Two pair 
                 9. One pair 	
                 10. High card`);
                  return;
                  } 
	
    
        if(text.includes("joke")){
          const response = await fetch(jokeURL);
          const joke = await response.json();
          product = JSON.stringify(joke.value);
          product = product.slice(1, -1);
          addResponseMessage(product);
          return;
      }


      
      if(text.includes("wins i")||text.includes("my wins")||text.includes("many wins")||text.includes("wins do")){
        
        let obj = JSON.stringify(userDetails)
         let user = JSON.parse(obj)
          product = user.wins
       addResponseMessage(`You have ${product} wins`);
        return;
        }
        if(text.includes("losses i")||text.includes("my losses")){
        
          let obj = JSON.stringify(userDetails)
         let user = JSON.parse(obj)
          product = user.losses
         addResponseMessage(`You have ${product} losses`);
          return;
          }
          if(text.includes("my email")){
         let obj = JSON.stringify(userDetails)
         let user = JSON.parse(obj)
          product = user.email
           addResponseMessage(`Your email is ${product}`);
            return;
            }   
            if(text.includes("hello pokerbot")){
        
              let obj = JSON.stringify(userDetails)
         let user = JSON.parse(obj)
          product = user.name
             addResponseMessage(`Hello ${product}, how can I help?`);
              return;
              }
              if(text.includes("my name")){
        
                let obj = JSON.stringify(userDetails)
         let user = JSON.parse(obj)
          product = user.name
               addResponseMessage(`Your name is ${product}`);
                return;
                } 
    
         if (compare(Utterances, Answers, text)) {

          product = compare(Utterances, Answers, text);
        } 
        else {
            console.log(Alternatives.length)
          product = Alternatives[Math.floor(Math.random() * Alternatives.length)];
        }
        addResponseMessage(product);
     }
   

function compare(utterancesArray, answersArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < utterancesArray.length; x++) {
    for (let y = 0; y < utterancesArray[x].length; y++) {
      if (utterancesArray[x][y] === string) {
        let replies = answersArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;
        break;
      }
    }
    if (replyFound) {
      break;
    }
  }
  return reply;
}


    return (
      <div className="App">
      
        <Widget
          handleNewUserMessage={handleNewUserMessage}
          profileAvatar={botIcon}
          title="PokerBOT"
          subtitle="Ask me about the Poker Society"
          showCloseButton={true}
        />
      </div>
    );
}

export default Chatbot;
