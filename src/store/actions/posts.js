import {apiCall} from '../../services/api';
import {GET_POSTS} from '../actionTypes';

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