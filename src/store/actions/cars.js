import {apiCall} from '../../services/api';
import {GET_CARS} from '../actionTypes';

export function getCars(n) {
	return dispatch => {
		return new Promise(async (resolve, reject) => {
			try {
				const resp = await apiCall('get', `/cars/random/${n}`, {});
				if(resp.error){
					return reject(resp.error);
				}
				dispatch({type: GET_CARS, cars: resp});
				return resolve();
			} catch(err) {
				return reject(err.message);
			}
		});
	}
}