import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import '../styles/dashboard.css';
import Menu from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import CircularProgress from '@material-ui/core/CircularProgress'; 
import { authMapStateToProps } from '../utils';

class UserDashboard extends Component {


    componentDidMount() {
        const { _id } = this.props.user;
    }

    render() {
        let {fullname, email, username, _id} = this.props.user;
        console.log(fullname)
        return (
            <div className="dashboard">
                <nav>
                    <IconButton style={{marginRight: 20}}>
                        <Menu />
                    </IconButton>
                    <div>
                        <h4 className="gradient-text">Hi,</h4>
                        <h1 className="gradient-text">{fullname}</h1>
                        <p className="light-text">{`@${username}`}</p>
                    </div>
                </nav>
            </div>
        )
    }
}

export default withRouter(connect(authMapStateToProps)(UserDashboard))