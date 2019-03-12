import React, { Component } from 'react';
import { Provider } from 'react-redux';
import logo from '../logo.svg';
import '../styles/App.css';
import { configStore } from '../store';
import AppRouter from '../routes';
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor} = configStore();

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<PersistGate persistor={persistor} loading={null /* TODO: CREATE LOADING SCREEN */}>
					<AppRouter />
				</PersistGate>
			</Provider>
		);
	}
}

export default App;
