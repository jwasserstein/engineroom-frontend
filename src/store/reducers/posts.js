import {GET_POSTS} from '../actionTypes';

const DEFAULT_STATE = {
	posts: [],
	lastUpdated: 0
}

export function postReducer(state=DEFAULT_STATE, action){
	switch (action.type){
		case GET_POSTS:
			return {...state, posts: action.posts, lastUpdated: Date.now()};
		default: 
			return state;
	}
}