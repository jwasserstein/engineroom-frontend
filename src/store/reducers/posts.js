import {GET_POSTS, TOGGLE_POST_LIKE, ADD_POST} from '../actionTypes';

const DEFAULT_STATE = {
	posts: [],
	lastUpdated: 0
}

export function postReducer(state=DEFAULT_STATE, action){
	switch (action.type){
		case GET_POSTS:
			return {...state, posts: action.posts, lastUpdated: Date.now()};
		case ADD_POST:
			return {...state, posts: [action.post, ...state.posts], lastUpdated: Date.now()};
		case TOGGLE_POST_LIKE:
			const newPosts = state.posts.map(p => {
				if(p._id === action.postId) {
					return {...p, likers: action.likers};
				}
				return p;
			});
			return {...state, posts: newPosts, lastUpdated: Date.now()};
		default: 
			return state;
	}
}