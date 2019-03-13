import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import '../styles/dashboard.css';
import Menu from '@material-ui/icons/Menu';
import { getRoomsApi } from '../store/actions/admin';
import { ADMIN_GET_ROOMS, authMapStateToProps } from '../utils';

class AdminDashboard extends Component {

    componentDidMount() {
        const { result, token } = this.props.admin;
        const { email, fname, username, _id } = result;
        this.props.dispatch(getRoomsApi(`${ADMIN_GET_ROOMS}?id=${_id['$oid']}`));
    }

    render() {
        const { result, token } = this.props.admin;
        const { email, fname, username, _id } = result;
        return (
            <div className="dashboard">
                <nav> 
                    <IconButton style={{marginRight: 20}}>
                        <Menu />
                    </IconButton>
                    <div>
                        <h4 className="gradient-text">Hi,</h4>
                        <h1 className="gradient-text">{fname}</h1>
                        <p className="light-text">{`@${username}`}</p>
                    </div>
                </nav>
            </div>
        )
    }
}

export default connect(authMapStateToProps)(AdminDashboard)
