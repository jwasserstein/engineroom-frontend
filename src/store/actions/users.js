import {GET_USERS, GET_USER} from '../actionTypes';
import {apiCall} from '../../services/api';

export function getUsers(n){
	return dispatch => {
		return new Promise(async (resolve, reject) => {
			try {
				const resp = await apiCall('get', `/users/random/${n}`, {});
				if(resp.error){
					return reject(resp.error);
				}
				
				dispatch({type: GET_USERS, users: resp});
				return resolve();
			} catch(err) {
				return reject(err.message);
			}
		});
	}
}

export function getUser(userId){
	return dispatch => {
		return new Promise(async (resolve, reject) => {
			try {
				const user = await apiCall('get', `/users/${userId}`, {});
				if(user.error){
					return reject(user.error);
				}
				
				dispatch({type: GET_USER, user, userId});
				return resolve();
			} catch(err) {
				return reject(err.message);
			}
		});
	}
}