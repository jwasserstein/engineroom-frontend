import {LOG_OUT, LOG_IN} from '../actionTypes';

const DEFAULT_STATE = {
	userId: '',
	username: '',
	user: {}
}

export function authReducer(state=DEFAULT_STATE, action){
	switch (action.type){
		case LOG_IN:
			return {...state, userId: action.id, username: action.username, user: action.user};
		case LOG_OUT:
			return DEFAULT_STATE;
		default: 
			return state;
	}
}