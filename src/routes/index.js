import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import AdminLogin from '../components/AdminLogin';
import AdminSignUp from '../components/AdminSignUp';
import UserLogin from '../components/UserLogin';
import UserSignUp from '../components/UserSignUp';
import FourOFour from '../components/FourOFour';

const AppRouter = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/admin/login" component={AdminLogin} />
            <Route path="/admin/signup" component={AdminSignUp} />
            <Route path="/user/login" component={UserLogin} />
            <Route path="/user/signup" component={UserSignUp} />
            <Route component={FourOFour} />
        </Switch>
    </Router>
)

export default AppRouter;
