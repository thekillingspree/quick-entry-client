import React from 'react';
import GroupIcon from '@material-ui/icons/Group';
import CurrentIcon from '@material-ui/icons/Timeline';

const RoomDisplay = props => {
    const {name, capacity, roomnumber, current} = props.room;
    return (
        <div className="room-display gradient-bg shadow">
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

export default RoomDisplay
