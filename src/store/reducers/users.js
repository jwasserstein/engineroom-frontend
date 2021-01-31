import {GET_USERS, REMOVE_USERS} from '../actionTypes';

const DEFAULT_STATE = {
	users: [],
	lastUpdated: 0
}

export function userReducer(state=DEFAULT_STATE, action){
	switch (action.type){
		case GET_USERS:
			return {...state, users: action.users, lastUpdated: Date.now()}
		case REMOVE_USERS:
			return {...state, users: [], lastUpdated: 0}
		default: 
			return state;
	}
}