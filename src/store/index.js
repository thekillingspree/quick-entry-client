import { compose, createStore, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

export const configStore = () => {
    const store = createStore(rootReducer, compose(
        applyMiddleware(thunk)
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));
    return store;
}