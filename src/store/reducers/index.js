import {combineReducers} from 'redux';
import {authReducer} from './auth';
import {postReducer} from './posts';
import {carReducer} from './cars';

const rootReducer = combineReducers({
    authReducer,
    postReducer,
    carReducer
});

export default rootReducer;