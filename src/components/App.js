import React, { Component } from 'react';
import { Provider } from 'react-redux';
import logo from '../logo.svg';
import '../styles/App.css';
import { configStore } from '../store';

const store = configStore();

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				
			</Provider>
		);
	}
}

export default App;
