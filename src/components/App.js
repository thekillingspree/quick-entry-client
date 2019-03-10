import React, { Component } from 'react';
import { Provider } from 'react-redux';
import logo from '../logo.svg';
import '../styles/App.css';
import { configStore } from '../store';
import AppRouter from '../routes';

const store = configStore();

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<AppRouter />
			</Provider>
		);
	}
}

export default App;
