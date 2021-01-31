import {apiCall} from '../../services/api';
import {GET_POSTS, TOGGLE_POST_LIKE, ADD_POST} from '../actionTypes';

export function getPosts() {
	return dispatch => {
		return new Promise(async (resolve, reject) => {
			try {
				const resp = await apiCall('get', '/posts', {});
				if(resp.error){
					return reject(resp.error);
				}
				dispatch({type: GET_POSTS, posts: resp});
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