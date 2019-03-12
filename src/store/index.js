import { compose, createStore, applyMiddleware  } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

export const configStore = () => {
    const store = createStore(rootReducer, compose(
        applyMiddleware(thunk)
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));
    let persistor = persistStore(store)
    return {store, persistor};
}