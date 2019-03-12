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
            <Route path="/user/login" render={props => (
                <UserSignUp
                    type="login"
                    secText="LOGIN"
                    greeting="Welcome Back."
                    dialogText="Logging In"
                    {...props}
                />
            )} />
            <Route path="/user/signup" render={props => (
                <UserSignUp
                    type="signup"
                    secText="SIGN UP"
                    dialogText="Signing you up"
                    greeting="Join Quick-Entry"
                    {...props}
                />
            )} />
            <Route component={FourOFour} />
        </Switch>
    </Router>
)

export default AppRouter;
