import React from 'react';
import { withRouter } from 'react-router-dom';
import '../styles/four.css';

const FourOFour = ({history}) => (
    <div className="fullscreen center all vertical">
        <h1 className="gradient-text four">404</h1>
        <p className="gradient-text">You have lost your way!</p>
        <button className="button" onClick={() => history.push("/")}>Home</button>
    </div>
)

export default withRouter(FourOFour);