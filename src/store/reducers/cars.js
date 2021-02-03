import {GET_CARS, REMOVE_CARS, GET_RANDOM_CARS} from '../actionTypes';

const DEFAULT_STATE = {
	cars: {},
	randomCarIds: [],
	lastUpdated: 0
}

export function carReducer(state=DEFAULT_STATE, action){
	switch (action.type){
		case GET_CARS:
			return {...state, cars: {...state.cars, ...action.cars}, lastUpdated: Date.now()};
		case REMOVE_CARS:
			return DEFAULT_STATE;
		case GET_RANDOM_CARS:
			return {...state, randomCarIds: action.randomCarIds};
		default: 
			return state;
	}
}