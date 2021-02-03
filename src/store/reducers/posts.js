import {GET_POSTS, TOGGLE_POST_LIKE, ADD_POST, REMOVE_POSTS, ADD_COMMENT, REMOVE_COMMENT, GET_FEED_POSTS} from '../actionTypes';

const DEFAULT_STATE = {
	posts: {},
	feedPostIds: [],
	lastUpdated: 0
}

export function postReducer(state=DEFAULT_STATE, action){
	switch (action.type){
		case GET_POSTS:
			return {...state, posts: {...state.posts, ...action.posts}, lastUpdated: Date.now()};
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
		case ADD_COMMENT:
			const newPosts2 = state.posts.map(p => {
				if(p._id === action.postId){
					return {...p, comments: [...p.comments, action.comment]};
				}
				return p;
			});
			return {...state, posts: newPosts2, lastUpdated: Date.now()};
		case REMOVE_COMMENT:
			const newPosts3 = state.posts.map(p => {
				if(p._id === action.postId){
					return {...p, comments: p.comments.filter(c => c._id !== action.commentId)};
				}
				return p;
			});
			return {...state, posts: newPosts3, lastUpdated: Date.now()};
		case REMOVE_POSTS:
			return DEFAULT_STATE;
		case GET_FEED_POSTS:
			return {...state, feedPostIds: action.feedPostIds};
		default: 
			return state;
	}
}