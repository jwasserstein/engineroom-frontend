import {LOG_IN, LOG_OUT, REMOVE_CARS, REMOVE_POSTS, REMOVE_USERS} from '../actionTypes';
import {apiCall} from '../../services/api';

export function logIn(username, password) {
	return dispatch => {
		return new Promise(async (resolve, reject) => {
			try {
				const resp = await apiCall('post', '/auth/signin', {username, password});
				if(resp.error){
					return reject(resp.error);
				}
				if(!resp.token){
					return reject('Error getting token');
				}
				localStorage.setItem('token', resp.token);
				dispatch({type: LOG_IN, ...resp});
				return resolve();
			} catch(err) {
				return reject(err.message);
			}
		});
	}
}

export function signUp(username, password, firstName, lastName){
	return dispatch => {
		return new Promise(async (resolve, reject) => {
			try {
				const resp = await apiCall('post', '/auth/signup', {username, password, firstName, lastName});
				if(resp.error){
					return reject(resp.error);
				}
				if(!resp.token){
					return reject('Error getting token');
				}
				localStorage.setItem('token', resp.token);
				dispatch({type: LOG_IN, ...resp});
				return resolve();
			} catch(err) {
				return reject(err.message);
			}
		});
	}
}

export function logOut() {
	return dispatch => {
		localStorage.removeItem('token');
		dispatch({type: REMOVE_CARS});
		dispatch({type: REMOVE_POSTS});
		dispatch({type: REMOVE_USERS});
		dispatch({type: LOG_OUT});
	}
}