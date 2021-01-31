import {apiCall} from '../../services/api';
import {GET_POSTS, TOGGLE_POST_LIKE} from '../actionTypes';

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
				dispatch({type: TOGGLE_POST_LIKE, likers: likers, postId: postId});
				return resolve();
			} catch(err) {
				return reject(err.message);
			}
		});
	}
}