import {apiCall} from '../../services/api';
import {GET_POSTS, TOGGLE_POST_LIKE, ADD_POST, ADD_COMMENT, REMOVE_COMMENT, GET_FEED_POSTS} from '../actionTypes';

export function getPosts(ids) {
	return dispatch => {
		return new Promise(async (resolve, reject) => {
			try {
				let path = '/posts';
				if(ids && ids.length > 0){
					path += '?ids=' + JSON.stringify(ids);
				}
				const resp = await apiCall('get', path);
				if(resp.error){
					return reject(resp.error);
				}

				const postObj = {};
				for(let i = 0; i < resp.posts.length; i++){
					postObj[resp.posts[i]._id] = resp.posts[i];
				}

				dispatch({type: GET_POSTS, posts: postObj});
				if('feedPostIds' in resp) dispatch({type: GET_FEED_POSTS, feedPostIds: resp.feedPostIds});
				return resolve();
			} catch(err) {
				return reject(err.message);
			}
		});
	}
}

export function togglePostLike(postId) {
	return dispatch => {
		return new Promise(async (resolve, reject) => {
			try {
				const likers = await apiCall('post', `/posts/${postId}/like`, {});
				if(likers.error){
					return reject(likers.error);
				}
				dispatch({type: TOGGLE_POST_LIKE, likers, postId});
				return resolve();
			} catch(err) {
				return reject(err.message);
			}
		});
	}
}

export function createPost(text) {
	return dispatch => {
		return new Promise(async (resolve, reject) => {
			try {
				const post = await apiCall('post', `/posts`, {text});
				if(post.error){
					return reject(post.error);
				}
				dispatch({type: ADD_POST, post});
				return resolve();
			} catch(err) {
				return reject(err.message);
			}
		});
	}
}

export function createComment(text, postId) {
	return dispatch => {
		return new Promise(async (resolve, reject) => {
			try {
				const comment = await apiCall('post', `/posts/${postId}/comments`, {text});
				if(comment.error){
					return reject(comment.error);
				}
				dispatch({type: ADD_COMMENT, comment, postId});
				return resolve();
			} catch(err) {
				return reject(err.message);
			}
		});
	}
}

export function deleteComment(commentId, postId) {
	return dispatch => {
		return new Promise(async (resolve, reject) => {
			try {
				const comment = await apiCall('delete', `/posts/${postId}/comments/${commentId}`);
				if(comment.error){
					return reject(comment.error);
				}
				dispatch({type: REMOVE_COMMENT, commentId: comment._id, postId});
				return resolve();
			} catch(err) {
				return reject(err.message);
			}
		});
	}
}