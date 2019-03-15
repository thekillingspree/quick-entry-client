import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getRoomDetails } from '../store/actions/admin';

class RoomDetails extends Component {

    state = {
        loading: true,
        room: null
    }

    componentDidMount() {
        const { uid, rid} = this.props.match.params;
        this.props.dispatch(getRoomDetails(uid, rid)).then((room) => {
            console.log(room);
        }).catch((err) => {
            console.log(err);
        }); 
    }


    render() {
        const { room, loading } = this.state;
        return (
            <div className="dashboard">
                Rooms info
                {(room && !loading) && <div className="room-details">
                    <h1 className="gradient-text">
                        { room.name }
                    </h1>
                </div>}
            </div>
        )
    }
}

export default withRouter(connect()(RoomDetails))
