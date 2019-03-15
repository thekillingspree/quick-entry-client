import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
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
            this.setState({room, loading: false})
        }).catch((err) => {
            this.props.history.push('/')
        }); 
    }


    render() {
        const { room, loading } = this.state;
        return (
            <div className="dashboard">
                {(room && !loading) && <div className="room-details">
                    <h1 className="gradient-text">
                        { room.name }
                    </h1>
                </div>}
                {loading && <div className="center all loading">
                    <CircularProgress size={70} thickness={5} className="progress"/>
                </div>}
            </div>
        )
    }
}

export default withRouter(connect()(RoomDetails))
