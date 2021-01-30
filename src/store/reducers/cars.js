import {GET_CARS} from '../actionTypes';

const DEFAULT_STATE = {
	cars: [],
	lastUpdated: 0
}

export function carReducer(state=DEFAULT_STATE, action){
	switch (action.type){
		case GET_CARS:
			return {...state, cars: action.cars, lastUpdated: Date.now()};
		default: 
			return state;
	}
}