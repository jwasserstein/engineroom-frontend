import {GET_USERS} from '../actionTypes';
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