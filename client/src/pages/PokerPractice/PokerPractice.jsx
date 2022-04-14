// IMPORTS
import React, { Component } from "react";


// STYLING
import "./PokerPractice.css"; 


// COMPONENTS
import Spinner from '../../components/PokerPractice/Spinner'; // loading logo
import Menu from "../../components/PokerPractice/menu/Menu"; // Menu
import Win from "../../components/PokerPractice/Win"; // Win - End screen
import Lost from "../../components/PokerPractice/Lost"; // Loss - End screen 
import Card from "../../components/PokerPractice/card/Card"; // Card 
import Player from "../../components/PokerPractice/player/Player"; // Player 
import PlayerShowdown from "../../components/PokerPractice/showdown/PlayerShowdown"; // Player - Showdown phase
import Navbar from "../../components/Navbar/Navbar";

// UTILITIES
import {
  renderShowdownMessages,
  renderNetPlayerEarnings
} from '../../components/PokerPractice/showdown/showdown'

import { 
  generateDeckOfCards, 
  shuffle, 
  dealPrivateCards,
} from '../../components/PokerPractice/card/cards.js';

import { 
  generateTable, 
  beginNextRound,
  checkWin
} from '../../components/PokerPractice/player/players.js';

import { 
  determineBlindIndices, 
  anteUpBlinds, 
  determineMinBet,
  handleBet,
  handleFold, 
} from '../../utils/bet.js';

import {
  handleAI as handleAIUtil
} from '../../utils/ai.js';

import {
  renderActionMenu,
  renderActionButtonText
} from "../../components/PokerPractice/actionmenu/actionmenu.js"

import { cloneDeep } from 'lodash';


class PokerPractice extends Component {

  // Setting initial state of the app (clean one, so we can reset it at the end of the game e.g., play again)
  clean_state = {
    loading: true, // loading 
    menu: "none",
    maxNBots: 4, // TODO: ADD OPTION FOR USER IN MENU TO SELECT THE NUMBER OF BOTS
    lost: null,
    winnerFound: null, // no winner at the start
    players: null, // players
    numPlayersActive: null, // how many players are playing
    numPlayersFolded: null, // how many players folded
    numPlayersAllIn: null, // how many plaers All in'd
    activePlayerIndex: null, // active player idx
    dealerIndex: null, // dealer idx
    blindIndex: null, // blind player idx
    deck: null, // round deck
    communityCards: [], // community cards
    pot: null, // pot amount
    highBet: null, // 
    betInputValue: null, // 
    sidePots: [],
    minBet: 20, // min bet
    phase: 'loading', // initial phase
    playerHierarchy: [], 
    showDownMessages: [], // end of round messages
    playActionMessages: [], // 
    playerAnimationSwitchboard: { // 
      0: {isAnimating: false, content: null},
      1: {isAnimating: false, content: null},
      2: {isAnimating: false, content: null},
      3: {isAnimating: false, content: null},
      4: {isAnimating: false, content: null},
      5: {isAnimating: false, content: null}
    }
  }

  // Used to control the flow of the game 
  state = this.clean_state

  cardAnimationDelay = 0;

  async componentDidMount() {

    const players = await generateTable(this.state.maxNBots);
    const dealerIndex = Math.floor(Math.random() * Math.floor(players.length));
    const blindIndicies = determineBlindIndices(dealerIndex, players.length);
    const playersBoughtIn = anteUpBlinds(players, blindIndicies, this.state.minBet);
    const imageLoaderRequest = new XMLHttpRequest();

    imageLoaderRequest.addEventListener("load", e => {
        console.log(`${e.type}`);
        console.log(e);
        console.log("Image Loaded!");
        this.setState({
          loading: false,
          menu: "startmenu"
        })
    });

    imageLoaderRequest.addEventListener("error", e => {
        console.log(`${e.type}`);
        console.log(e);
    });

    imageLoaderRequest.addEventListener("loadstart", e => {
        console.log(`${e.type}`);
        console.log(e);
    });

    imageLoaderRequest.addEventListener("loadend", e => {
        console.log(`${e.type}`);
        console.log(e);
    });

    imageLoaderRequest.addEventListener("abort", e => {
        console.log(`${e.type}`);
        console.log(e);
    });

    imageLoaderRequest.addEventListener("progress", e => {
        console.log(`${e.type}`);
        console.log(e);
    });

    imageLoaderRequest.open("GET", "./assets/pokerpractice/cards/card-back.svg");
    imageLoaderRequest.send();

    this.setState(prevState => ({
      // loading: false,
      players: playersBoughtIn,
      numPlayersActive: players.length,
      numPlayersFolded: 0,
      numPlayersAllIn: 0,
      activePlayerIndex: dealerIndex,
      dealerIndex,
      blindIndex: {
        big: blindIndicies.bigBlindIndex,
        small: blindIndicies.smallBlindIndex,
      },
      deck: shuffle(generateDeckOfCards()),
      pot: 0,
      highBet: prevState.minBet,
      betInputValue: prevState.minBet,
      phase: 'initialDeal',
    }))

  }

  // "Main" render 
  render() {
    return (
      
      <div className="PokerPractice">
        <Navbar/>
        <div className='poker-table--wrapper'> 
          { 
            (this.state.loading) ? <Spinner/> : 
            (this.state.winnerFound) ? <Win updateState={this.restartHandler}/> :
            (this.state.lost) ? <Lost updateState={this.restartHandler}/> :
            (this.state.menu === "startmenu") ? <Menu updateState={this.menuHandler}/> :
            this.renderGame()
          }
        </div>
      </div>
    );
  }
  
  // THESE TWO MUST BE FIXED, THEY ALTER THE STATE DIRECTLY (NOT GOOD)
  menuHandler = (menuData) => {
    // TODO ADD MENU OPTIONS (N BOTS, MIN BET) - 
    this.state.nBots = parseInt(menuData)
    this.state.menu = "aa"
    this.runGameLoop()
  }

  restartHandler = () => {
    this.state = this.clean_state
    this.setState = {
      menu: "none"
    }
  }

  // Running the game 
  runGameLoop = () => {
    // Dealing private cards (start of the game)
    const newState = dealPrivateCards(cloneDeep(this.state))
    // Bot turns if first turn isn't the user
    this.setState(newState, () => {
      if((this.state.players[this.state.activePlayerIndex].robot) && (this.state.phase !== 'showdown')) {
        setTimeout(() => {
          this.handleAI()
        }, 3000)
      }
    })
  }

  // Rendering the game
  renderGame = () => {

    const { highBet, players, activePlayerIndex, phase } = this.state;

    return (
      <div className='poker-app--background'>
        {/* Displaying the table */}
        <div className="poker-table--container">
          { (this.state.menu === 'aa') && this.renderBoard() }
          <div className='community-card-container' >
            { (this.state.menu === 'aa') && this.renderCommunityCards() }
          </div>
          <div className='pot-container'>
            <h4> { (this.state.menu === 'aa') && `Pot amount: ${this.state.pot}`} </h4>
          </div>
        </div>
        { (this.state.phase === 'showdown') && this.renderShowdown() } 

        <div className='game-action-bar' >


          {/* if state isn't loading, draw action bar */}
          {/* further internal checks to draw it only when it's the user's turn to bet */}
          <div className='slider-boi'> 
            { (!this.state.loading) && (this.state.menu === 'aa')
            && renderActionMenu(highBet, players, activePlayerIndex, phase, this.handleBetInputChange)}
          </div>
          
          <div className='action-buttons'>
            { (this.state.menu === 'aa') && this.renderActionButtons() }
          </div>

        </div>
      </div>
    )
  }

  // Creating the board
  renderBoard = () => {
    const { 
      players,
      activePlayerIndex,
      dealerIndex,
      clearCards,
      phase,
      playerAnimationSwitchboard
    } = this.state;
    
    // Reverse Players Array for the sake of taking turns counter-clockwise.
    const reversedPlayers = players.reduce((result, player, index) => {
      
      const isActive = (index === activePlayerIndex);
      const hasDealerChip = (index === dealerIndex);

      result.unshift(
          <Player
            key={index}
            arrayIndex={index}
            isActive={isActive}
            hasDealerChip={hasDealerChip}
            player={player}
            clearCards={clearCards}
            phase={phase}
            playerAnimationSwitchboard={playerAnimationSwitchboard}      
            endTransition={this.popAnimationState}
          />
      )
      return result
    }, []);
    return reversedPlayers.map(component => component);
  }

  // Rendering community cards (during each stage of the game as well as the showdown)
  // if showdown -> no animation for the cards
  renderCommunityCards = (noAnimation) => {
    return this.state.communityCards.map((card, index) => {
      let cardData = {...card};
      if (noAnimation) {
        cardData.animationDelay = 0;
      }
      return(
        <Card key={index} cardData={cardData}/>
      );
    });
  }

  handleBetInputChange = (val, min, max) => {
    if (val === '') val = min
    if (val > max) val = max
      this.setState({
        betInputValue: parseInt(val, 10),
      });
  }
  
  pushAnimationState = (index, content) => {
    const newAnimationSwitchboard = Object.assign(
      {}, 
      this.state.playerAnimationSwitchboard,
      {[index]: {isAnimating: true, content}}     
    )
    this.setState({playerAnimationSwitchboard: newAnimationSwitchboard});
  }

  popAnimationState = (index) => {
    const persistContent = this.state.playerAnimationSwitchboard[index].content;
    const newAnimationSwitchboard = Object.assign(
      {}, 
      this.state.playerAnimationSwitchboard,
      {[index]: {isAnimating: false, content: persistContent}}     
    )
    this.setState({playerAnimationSwitchboard: newAnimationSwitchboard});
  }

  handleAI = () => {
    const {playerAnimationSwitchboard, ...appState} = this.state;
    const newState = handleAIUtil(cloneDeep(appState), this.pushAnimationState)

      this.setState({
            ...newState,
            betInputValue: newState.minBet
      }, () => {
        if((this.state.players[this.state.activePlayerIndex].robot) && (this.state.phase !== 'showdown')) {
          setTimeout(() => {
          
            this.handleAI()
          }, 1200)
        }
      })
  }

  renderRankTie = (rankSnapshot) => {
    return rankSnapshot.map(player => {
      return this.renderRankWinner(player);
    })
  }

  renderRankWinner = (player) => {
    const { name, bestHand, handRank } = player;
    const playerStateData = this.state.players.find(statePlayer => statePlayer.name === name);
    return (
      <div className="player-showdown--entity" key={name}>
        <PlayerShowdown
          name={name}
          cards={playerStateData.cards}
          //roundEndChips={playerStateData.roundEndChips}
          //roundStartChips={playerStateData.roundStartChips}
        />
        <div className="player-showdown--besthand--container">
          <h5 className="player-showdown--besthand--heading">
            Best hand
          </h5>
          <div className='player-showdown--besthand--cards' style={{alignItems: 'center'}}>
            {
              bestHand.map((card, index) => {
                // Reset Animation Delay
                const cardData = {...card, animationDelay: 0}
                return <Card key={index} cardData={cardData}/>
              })
            }
          </div>
        </div>
        <div className="showdown-handrank--container">
          <div className="showdown-handrank-label">
            {handRank}
          </div>
        </div>
        {renderNetPlayerEarnings(playerStateData.roundEndChips, playerStateData.roundStartChips)}
      </div>
    )
  }

  renderBestHands = () => {
    const { playerHierarchy } = this.state;

    return playerHierarchy.map(rankSnapshot => {
      const tie = Array.isArray(rankSnapshot);
      return tie ? this.renderRankTie(rankSnapshot) : this.renderRankWinner(rankSnapshot);
    })
  }

  handleNextRound = () => {
    this.setState({clearCards: true})
    const newState = beginNextRound(cloneDeep(this.state))
    // Check win condition
    if(checkWin(newState.players)) {
      this.setState({ winnerFound: true })
      return;
    }
    this.setState(newState, () => {
      if((this.state.players[this.state.activePlayerIndex].robot) && (this.state.phase !== 'showdown')) {
        setTimeout(() => this.handleAI(), 1200)
      }
    })
  }

  renderActionButtons = () => {

    const { highBet, players, activePlayerIndex, phase, betInputValue } = this.state
    const min = determineMinBet(highBet, players[activePlayerIndex].chips, players[activePlayerIndex].bet)
    const max = players[activePlayerIndex].chips + players[activePlayerIndex].bet

    return ((players[activePlayerIndex].robot) || (phase === 'showdown')) ? null : (

      <React.Fragment>
        <button className='fold-button' onClick={() => this.handleFold()}>
          Fold
        </button>
        <button className='action-button' onClick={() => this.handleBetInputSubmit(betInputValue, min, max)}>
          {renderActionButtonText(highBet, betInputValue, players[activePlayerIndex])}
        </button>
      </React.Fragment>

      )
  }

  handleFold = () => {
    const {playerAnimationSwitchboard, ...appState} = this.state
    const newState = handleFold(cloneDeep(appState));
      this.setState(newState, () => {
        if((this.state.players[this.state.activePlayerIndex].robot) && (this.state.phase !== 'showdown')) {
          setTimeout(() => {
          
            this.handleAI()
          }, 1200)
        }
      })
  }

  handleBetInputSubmit = (bet, min, max) => {
    const {playerAnimationSwitchboard, ...appState} = this.state;
    const { activePlayerIndex } = appState;
    this.pushAnimationState(activePlayerIndex, `${renderActionButtonText(this.state.highBet, this.state.betInputValue, this.state.players[this.state.activePlayerIndex])} ${(bet > this.state.players[this.state.activePlayerIndex].bet) ? (bet) : ""}`);;
    const newState = handleBet(cloneDeep(appState), parseInt(bet, 10), parseInt(min, 10), parseInt(max, 10));
      this.setState(newState, () => {
        if((this.state.players[this.state.activePlayerIndex].robot) && (this.state.phase !== 'showdown')) {
          setTimeout(() => {
          
            this.handleAI()
          }, 1200)
        }
      });
  }

  renderShowdown = () => {
    return(
      <>
  
      <div className='showdown-container--wrapper'>
        <h5 className="showdown-container--title">
          Round complete!
        </h5>
        <div className="showdown-container--messages">
          { renderShowdownMessages(this.state.showDownMessages)}
        </div>
        <h5 className="showdown-container--community-card-label">
          Community cards
        </h5>
        <div className='showdown-container--community-cards'>
          { this.renderCommunityCards(true) }
        </div>
        <button className="showdown--nextRound--button" onClick={() => this.handleNextRound()}> NEXT ROUND </button> 
        { this.renderBestHands() }
      </div>
      </>
    )
  }
}

export default PokerPractice;
