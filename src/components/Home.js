import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../styles/home.css';
import Open from '../img/open.svg';
import ErrorSnackbar from './ErrorSnackbar';
import { errorMSP } from '../utils';

const Home = props => {
    return (
        <div className="home-hero">
            {(props.error) && <ErrorSnackbar
                open
                message={props.error}
            />}
            <div className="container" style={{margin: 0}}>
                <h1>Quick-Entry</h1>    
                <h3>Entry Management system for Terna Engineering College</h3>
                <Link to="/admin/login" className="button accent" style={{width: 200}}><p>Get Started For Admins</p></Link>
                <Link to="/user/signup" className="button accent" style={{width: 200}}><p>Get Started For Students</p></Link>
            </div>
        </div>
    );
}

export default connect(errorMSP)(Home);