import {LOG_OUT, LOG_IN, GET_USERS} from '../actionTypes';

const DEFAULT_STATE = {
	userId: '',
	username: '',
	imageUrl: '',
	users: [],
	usersLastUpdated: 0,
	loggedInAt: 0
}

export function authReducer(state=DEFAULT_STATE, action){
	switch (action.type){
		case LOG_IN:
			return {...state, userId: action.id, username: action.username, joinDate: action.joinDate, imageUrl: action.imageUrl, loggedInAt: Date.now()};
		case LOG_OUT:
			return {...state, userId: '', username: '', joinDate: 0, imageUrl: '', loggedInAt: 0};
		case GET_USERS:
			return {...state, users: action.users, usersLastUpdated: Date.now()}
		default: 
			return state;
	}
}