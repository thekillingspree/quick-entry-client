import React from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '../styles/fade.css';
import Home from '../components/Home';
import AdminSignUp from '../components/AdminSignUp';
import UserSignUp from '../components/UserSignUp';
import FourOFour from '../components/FourOFour';
import { authMapStateToProps } from '../utils';
import AdminDashboard from '../components/AdminDashboard';
import NewRoom from '../components/NewRoom';

const Routes = ({location, isUserAuthenticated, isAdminAuthenticated, admin, user}) => {
    return (
        <div>
            <TransitionGroup>
                <CSSTransition
                    timeout={{enter: 300, exit: 300}}
                    classNames={'fade'}
                    key={location.key}>
                    <Switch location={location}>
                        <Route path="/" exact component={Home} />
                        <Route path="/admin/login" render={props => (
                            !isAdminAuthenticated ?
                            <AdminSignUp
                                type="login"
                                secText="LOGIN"
                                greeting="Welcome Back."
                                dialogText="Logging In"
                                {...props}
                            /> :
                            <Redirect to="/admin/dashboard" />
                        )}/>
                        <Route path="/admin/signup" render={props => (
                            !isAdminAuthenticated ?
                            <AdminSignUp
                                type="signup"
                                secText="SIGN UP"
                                greeting="Admin Sign Up"
                                dialogText="Signing you up"
                                {...props}
                            /> :
                            <Redirect to="/admin/dashboard" />
                        )}/>
                        <Route path="/user/login" render={props => (
                            !isUserAuthenticated ?
                            <UserSignUp
                                type="login"
                                secText="LOGIN"
                                greeting="Welcome Back."
                                dialogText="Logging In"
                                {...props}
                            /> : <Redirect to="/" />
                        )} />
                        <Route path="/user/signup" render={props => (
                            !isUserAuthenticated ?
                            <UserSignUp
                                type="signup"
                                secText="SIGN UP"
                                dialogText="Signing you up"
                                greeting="Join Quick-Entry"
                                {...props}
                            /> : <Redirect to="/" />
                        )} />
                        <Route path="/admin/dashboard" render={props => (
                            isAdminAuthenticated && !isUserAuthenticated?
                            <AdminDashboard
                                admin={admin}
                            /> :
                            <Redirect to={{pathname: "/"}}  />
                        )} />
                        <Route path="/admin/new" render={props => (
                            isAdminAuthenticated && !isUserAuthenticated?
                            <NewRoom
                                admin={admin}
                            /> :
                            <Redirect to={{pathname: "/"}}  />
                        )} />
                        <Route component={FourOFour} />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </div>    
    )
}

export default withRouter(connect(authMapStateToProps)(Routes))