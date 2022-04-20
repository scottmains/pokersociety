import { v1 as uuid } from 'uuid';
import { 
	handlePhaseShift, 
	reconcilePot, 
	anteUpBlinds, 
	determineBlindIndices 
} from '../../../utils/bet.js';

import { 
	dealMissingCommunityCards, 
	showDown, 
	generateDeckOfCards, 
	shuffle, 
	dealPrivateCards 
} from '../card/cards.js';

const axios = require('axios')

const generateTable = async (nBots) => {

	// user data
	const users = [{
		id: uuid(), // ID
		name: 'You',
		cards: [],
		showDownHand: {
			hand: [],
			descendingSortHand: [], 
		},
		chips: 20000,
		roundStartChips: 20000,
		roundEndChips: 20000,
		currentRoundChipsInvested: 0,
		bet: 0,
		betReconciled: false,
		folded: false,
		allIn: false,
		canRaise: true,
		stackInvestment: 0,
		robot: false
	}];

	// generating random name for the bot + its data
	const response = await axios.get(`https://randomuser.me/api/?results=` + nBots + `&nat=gb`);

	response.data.results
		.map(user => {
			const randomizedChips = Math.floor(Math.random() * (20000 - 18000)) + 18000;
			return ({
				id: uuid(),
				name: `${user.name.first.charAt(0).toUpperCase()}${user.name.first.slice(1)}`,
				cards: [],
				chips: randomizedChips,
				roundStartChips: randomizedChips,
				roundEndChips: randomizedChips,
				currentRoundChipsInvested: 0,
				showDownHand: {
					hand: [],
					descendingSortHand: [],
				},
				bet: 0,
				betReconciled: false,
				folded: false,
				allIn: false,
				robot: true,
				canRaise: true,
				stackInvestment: 0,
			})
		})
		.forEach(user => users.push(user))

	return users
}

const handleOverflowIndex = (currentIndex, incrementBy, arrayLength, direction) => {
	switch (direction) {
		case('up'): {
			return (
				(currentIndex + incrementBy) % arrayLength
			)
		}
		case('down'): {
			return (
				((currentIndex - incrementBy) % arrayLength) + arrayLength 
			)
		}
		default: throw Error("Attempted to overfow index on unfamiliar direction");
	}
}

const determinePhaseStartActivePlayer = (state, recursion = false) => {
	if (!recursion) {
		state.activePlayerIndex = handleOverflowIndex(state.blindIndex.big, 1, state.players.length, 'up');
	} else if (recursion) {
		state.activePlayerIndex = handleOverflowIndex(state.activePlayerIndex, 1, state.players.length, 'up');
	}
		if (state.players[state.activePlayerIndex].folded) {
			return determinePhaseStartActivePlayer(state, true)
		}
		if (state.players[state.activePlayerIndex].chips === 0) {
			return determinePhaseStartActivePlayer(state, true)
		}
				return state
}

const determineNextActivePlayer = (state) => {
	state.activePlayerIndex = handleOverflowIndex(state.activePlayerIndex, 1, state.players.length, 'up');
	const activePlayer = state.players[state.activePlayerIndex];

	const allButOnePlayersAreAllIn = (state.numPlayersActive - state.numPlayersAllIn === 1);
	if (state.numPlayersActive ===  1) {
		console.log("Only one player active, skipping to showdown.")
		return(showDown(reconcilePot(dealMissingCommunityCards(state))));
	}
	if (activePlayer.folded) {
		console.log("Current player index is folded, going to next active player.")
		return determineNextActivePlayer(state);
	}

	if (
		allButOnePlayersAreAllIn &&
		!activePlayer.folded &&
		activePlayer.betReconciled
	) {
		return(showDown(reconcilePot(dealMissingCommunityCards(state))));
	}

	if (activePlayer.chips === 0) {
		if (state.numPlayersAllIn === state.numPlayersActive) {
			console.log("All players are all in.")
			return(showDown(reconcilePot(dealMissingCommunityCards(state))));
		} else if (allButOnePlayersAreAllIn && activePlayer.allIn) {
			return(showDown(reconcilePot(dealMissingCommunityCards(state))));
		} else {
			return determineNextActivePlayer(state);
		}
	}

	if (activePlayer.betReconciled) {
		console.log("Player is reconciled with pot, round betting cycle complete, proceed to next round.")
		return handlePhaseShift(state);
	}

	return state
}

const passDealerChip = (state) => {
	
	state.dealerIndex = handleOverflowIndex(state.dealerIndex, 1, state.players.length, 'up');
	const nextDealer = state.players[state.dealerIndex]
	if (nextDealer.chips === 0) {
		return passDealerChip(state)
	}

		return filterBrokePlayers(state, nextDealer.name);
}

/* !!!!
 Action is initiated on the first betting round by the first player to the left of the blinds. On all subsequent betting rounds, the action begins with the first active player to the left of the button.
 */
const filterBrokePlayers = (state, dealerID) => {

	// Checking if the user lost, if he did no reason to keep the game going
	if(state.players[0].name === 'You' && state.players[0].chips === 0) {
		state.lost = true
		return state 
	}

	state.players = state.players.filter(player => player.chips > 0);
	const newDealerIndex = state.players.findIndex(player => player.name === dealerID)
	state.dealerIndex = newDealerIndex
	state.activePlayerIndex = newDealerIndex // This is incorrect, action should proceed to the left of the blinds -- if there are only 2 people...will it be the small blind? If there are 3, is it the dealer? Action is initiated on the first betting round by the first player to the left of the blinds. On all subsequent betting rounds, the action begins with the first active player to the left of the button.)))) This means THIS FUNCTION WILL CHANGE depending on the ACTIVE PHASE....
	if (state.players.length === 1) {
		// Victory!
		return state
	} else if (state.players.length === 2) {
		// Need to refine rules for who goes first when 2 players are left
		// Can move this logic to our determineBlindIndices fn
		state.blindIndex.small = newDealerIndex;
		state.blindIndex.big = handleOverflowIndex(newDealerIndex, 1, state.players.length, 'up');
		state.players = anteUpBlinds(state.players, { bigBlindIndex: state.blindIndex.big, smallBlindIndex: state.blindIndex.small }, state.minBet).map(player => ({
			...player,
			cards:[],
			showDownHand: {
				hand: [],
				descendingSortHand: [],
			},
			roundStartChips: player.chips + player.bet,
			currentRoundChipsInvested: 0,
			betReconciled: false,
			folded: false,
			allIn: false,
		}))
		state.numPlayersAllIn = 0;
		state.numPlayersFolded = 0;
		state.numPlayersActive = state.players.length;
	} else {
		const blindIndicies = determineBlindIndices(newDealerIndex, state.players.length);
		state.blindIndex = {
        	big: blindIndicies.bigBlindIndex,
        	small: blindIndicies.smallBlindIndex,
      	}
		state.players = anteUpBlinds(state.players, blindIndicies, state.minBet).map(player => ({
			...player,
			cards: [],
			showDownHand: {
				hand: [],
				descendingSortHand: [],
			},
			roundStartChips: player.chips + player.bet,
			currentRoundChipsInvested: 0,
			betReconciled: false,
			folded: false,
			allIn: false,
		}))
		state.numPlayersAllIn = 0; // May need to alter this is big/small blind brings a player all in
		state.numPlayersFolded = 0;
		state.numPlayersActive = state.players.length;
	}
		return dealPrivateCards(state)
}

const beginNextRound = (state) => {
	state.communityCards = [];
	state.sidePots = [];
	state.playerHierarchy = [];
	state.showDownMessages = [];
	state.deck = shuffle(generateDeckOfCards())
	state.highBet = 20;
	state.betInputValue = 20;
	state.minBet = 20; // can export out to initialState
	// Unmount all cards so react can re-trigger animations
	const { players } = state;
	const clearPlayerCards = players.map(player => ({...player, cards: player.cards.map(card => {})}))
	state.players = clearPlayerCards;
	return passDealerChip(state)
}

const checkWin = players => {
	return (players.filter(player => player.chips > 0).length === 1)
}

// NEED INITIAL PLAYER STATE
// INITIAL TABLE STATE
export { 
	generateTable, 
	handleOverflowIndex, 
	determineNextActivePlayer, 
	determinePhaseStartActivePlayer, 
	beginNextRound, 
	checkWin
}