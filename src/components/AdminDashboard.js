import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import '../styles/dashboard.css';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getRoomsApi, logoutAdmin } from '../store/actions/admin';
import { ADMIN_GET_ROOMS, authMapStateToProps } from '../utils';
import RoomDisplay from './RoomDisplay';

class AdminDashboard extends Component {

    state = {
        menu: null
    }

    componentDidMount() {
        const { _id } = this.props.admin.admin;
        this.props.dispatch(getRoomsApi(`${ADMIN_GET_ROOMS}?id=${_id['$oid']}`));
    }

    openMenu = e => {
        this.setState({menu: e.currentTarget});
    }

    closeMenu = () => {
        this.setState({menu: null});
    }

    render() {
        let { email, fname, username, _id} = this.props.admin.admin;
        _id = _id['$oid'];
        const {menu} = this.state;
        const {history, dispatch} = this.props;
        const {rooms} = this.props.admin;
        console.log(rooms, _id);
        return (
            <div className="dashboard">
                <nav> 
                    <Menu
                        anchorEl={menu}
                        open={!!menu}
                        onClose={this.closeMenu}>
                        <MenuItem selected={false} onClick={() => dispatch(logoutAdmin())}>Logout</MenuItem>
                    </Menu>
                    <IconButton onClick={this.openMenu} style={{marginRight: 20}}>
                        <MenuIcon />
                    </IconButton>
                    <div>
                        <h4 className="gradient-text">Hi,</h4>
                        <h1 className="gradient-text">{fname}</h1>
                        <p className="light-text">{`@${username}`}</p>
                    </div>
                </nav>
                {rooms.length >= 0 && <div className="rooms">
                    <div className="rooms-wrapper">
                        { rooms.length > 0 &&
                        rooms.map((room, i) => (
                                <RoomDisplay uid={_id} room={room} key={i}/>
                        ))
                        }
                        <div className="room-display create center all" onClick={() => history.push("/admin/new")}>
                            <h1 className="">Create a new room</h1>
                            <AddIcon style={{fontSize: 45, marginTop: 20}} />
                        </div>
                    </div>    
                </div>}
                {rooms.length < 0 && <div className="center all loading"><CircularProgress size={70} thickness={5} className="progress"/></div>}
            </div>
        )
    }
}

export default withRouter(connect(authMapStateToProps)(AdminDashboard))
