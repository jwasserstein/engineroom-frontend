import {GET_USERS, REMOVE_USERS, GET_USER} from '../actionTypes';

const DEFAULT_STATE = {
	users: [],
	lastUpdated: 0
}

export function userReducer(state=DEFAULT_STATE, action){
	switch (action.type){
		case GET_USERS:
			return {...state, users: action.users, lastUpdated: Date.now()};
		case GET_USER:
			return {...state, [action.user._id]: {...action.user, lastUpdated: Date.now()}};
		case REMOVE_USERS:
			return DEFAULT_STATE
		default: 
			return state;
	}
}