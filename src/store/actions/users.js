import {GET_USERS, GET_RANDOM_USERS} from '../actionTypes';
import {apiCall} from '../../services/api';

export function getUsers(n){
	return dispatch => {
		return new Promise(async (resolve, reject) => {
			try {
				const resp = await apiCall('get', `/users/random/${n}`, {});
				if(resp.error){
					return reject(resp.error);
				}

				const userObj = {};
				for(let i = 0; i < resp.users.length; i++){
					userObj[resp.users[i]._id] = resp.users[i];
				}
				
				dispatch({type: GET_USERS, users: userObj});
				dispatch({type: GET_RANDOM_USERS, randomUserIds: resp.randomUserIds});
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
				
				dispatch({type: GET_USERS, user, userId});
				return resolve();
			} catch(err) {
				return reject(err.message);
			}
		});
	}
}