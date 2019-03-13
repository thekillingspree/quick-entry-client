import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '../styles/fade.css';
import Home from '../components/Home';
import AdminLogin from '../components/AdminLogin';
import AdminSignUp from '../components/AdminSignUp';
import UserSignUp from '../components/UserSignUp';
import FourOFour from '../components/FourOFour';

const Routes = ({location}) => {
    return (
        <div>
            <TransitionGroup>
                <CSSTransition
                    timeout={{enter: 300, exit: 300}}
                    classNames={'fade'}
                    key={location.key}>
                    <Switch location={location}>
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
                </CSSTransition>
            </TransitionGroup>
        </div>    
    )
}

export default withRouter(Routes)