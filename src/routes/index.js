import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';

const AppRouter = (props) => (
    <Router>
        <Routes />
    </Router>
)

export default (AppRouter);
