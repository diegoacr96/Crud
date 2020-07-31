import {createStore, applyMiddleware, combineReducers } from 'redux';
import Thunk from 'redux-thunk';

import {Users} from './users';

let middlewares = [];

middlewares.push(Thunk);

if(process.env.NODE_ENV === "development"){
    const {logger} = require('redux-logger');
    middlewares.push(logger);
}

const configureStore = () => {
    const store = createStore(
        combineReducers({
            Users: Users
        }),
        applyMiddleware(...middlewares)
    );

    return store;
}

export default configureStore;