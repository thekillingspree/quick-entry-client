import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import '../styles/dashboard.css';
import Menu from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import { getRoomsApi } from '../store/actions/admin';
import { ADMIN_GET_ROOMS, authMapStateToProps } from '../utils';
import RoomDisplay from './RoomDisplay';

class AdminDashboard extends Component {

    componentDidMount() {
        const { _id } = this.props.admin.admin;
        this.props.dispatch(getRoomsApi(`${ADMIN_GET_ROOMS}?id=${_id['$oid']}`));
    }

    render() {
        const { email, fname, username} = this.props.admin.admin;
        const {rooms} = this.props.admin;
        console.log(rooms);
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
                <div className="rooms">
                    <div className="rooms-wrapper">
                        { rooms.length > 0 &&
                        rooms.map((room, i) => (
                                <RoomDisplay room={room} key={i}/>
                        ))
                        }
                        <div className="room-display create center all light-text">
                            <h1 className="light-text">Create a new room</h1>
                            <AddIcon style={{fontSize: 45, marginTop: 20}} />
                        </div>
                    </div>    
                </div>
            </div>
        )
    }
}

export default connect(authMapStateToProps)(AdminDashboard)
