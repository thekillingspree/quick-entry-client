import React from 'react';
import { withRouter } from 'react-router-dom';
import GroupIcon from '@material-ui/icons/Group';
import CurrentIcon from '@material-ui/icons/Timeline';

const RoomDisplay = props => {
    const  { uid, history, room } = props;
    const {name, capacity, roomnumber, current} = room;
    
    const handleClick = () => {
        let {_id} = room;
        _id = _id['$oid']
        history.push(`/admin/${uid}/room/${_id}`)
    }
    return (
        <div onClick={handleClick} className="room-display gradient-bg shadow">
            <div className="top">
                <h1>{name}</h1>
                <p>{roomnumber}</p>
            </div>
            <div className="bottom">
                <span className="center vertical"><GroupIcon style={{marginRight: 10}}/>  {capacity}</span>
                <span className="center vertical"><CurrentIcon style={{marginRight: 10}}/>  {current}</span>
            </div>
        </div>
    )
}

export default withRouter(RoomDisplay)
