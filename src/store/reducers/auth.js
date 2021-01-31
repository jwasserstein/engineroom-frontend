import {LOG_OUT, LOG_IN} from '../actionTypes';

const DEFAULT_STATE = {
	userId: '',
	username: '',
	joinDate: 0,
	imageUrl: '',
	firstName: '',
	lastName: '',
	bio: '',
	cars: [],
	friends: [],
	posts: [],
	loggedInAt: 0
}

export function authReducer(state=DEFAULT_STATE, action){
	switch (action.type){
		case LOG_IN:
			return {
				...state, 
				userId: action.id, 
				username: action.username, 
				joinDate: action.joinDate, 
				imageUrl: action.imageUrl,
				firstName: action.firstName,
				lastName: action.lastName,
				bio: action.bio,
				cars: action.cars,
				friends: action.friends,
				posts: action.posts,
				loggedInAt: Date.now()
			};
		case LOG_OUT:
			return DEFAULT_STATE;
		default: 
			return state;
	}
}