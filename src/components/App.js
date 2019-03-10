import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import logo from '../logo.svg';
import '../styles/App.css';
import { configStore } from '../store';
import AppRouter from '../routes';

const store = configStore();

class App extends Component {
	render() {
		const state = store.getState();
		return (
			<Provider store={store}>
				<AppRouter />
				{state.errors.message && 
					<Snackbar
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right'
						}}
						open={true}
						autoHideDuration={5000}
						message={state.errors.message}
					/>
				}
			</Provider>
		);
	}
}

export default App;
