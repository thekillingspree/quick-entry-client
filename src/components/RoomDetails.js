import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import MUIDataTable from "mui-datatables";
import { MuiThemeProvider } from '@material-ui/core/styles';
import { getRoomDetails } from '../store/actions/admin';
import '../styles/details.css';
import { getMUITheme } from '../utils';

class RoomDetails extends Component {

    state = {
        loading: true,
        data: [],
        room: null
    }

    componentDidMount() {
        const { uid, rid} = this.props.match.params;
        this.props.dispatch(getRoomDetails(uid, rid)).then((room) => {
            console.log(room);
            room.entrylist.forEach(r => {
                let {user, exittime, timestamp } = r;
                let temp = timestamp;
                const dateString = moment(timestamp).format('ddd, MMM Do YYYY');
                let timeSpent = moment().diff(timestamp, 'minutes');
                if (exittime) {
                    timeSpent = moment(exittime).diff(timestamp, 'minutes');
                    if (timeSpent <= 0) {
                        timeSpent = 0;
                    }
                    exittime = moment(exittime).format('hh:mm A');
                } else {
                    if (timeSpent <=0)  {
                        timeSpent = 'Just Entered';
                    }
                    exittime = '-';
                }
                
                timestamp = moment(timestamp).format('hh:mm A');
                console.log()
                this.setState(prevState => ({
                    data: [...prevState.data, [user.fullname, user.tecid, dateString, timestamp, exittime, timeSpent, temp]]
                }));
            });
            this.setState({room, loading: false})
        }).catch((err) => {
            console.log(err)
            //TODO: HANDLE
            this.props.history.push('/')
        }); 
    }


    render() {
        const { room, loading, data} = this.state;
        const columns = [
            {
                name: 'Name',
                options: {
                    filter: false,
                    sort: false
                
                }
            },
            {
                name: 'TEC ID',
                options: {
                    sort: false,
                    filter: false
                }
            },
            {
                name: 'Date',
            },
            {
                name: 'Entry Time',
                options: {
                    filter: false,
                    sort: false
                }
            },
            {
                name: 'Exit Time',
                options: {
                    filter: false,
                    sort: false
                }
            },
            {
                name: 'Time Spent (mins)',
                options: {
                    filter: false,
                    sort: false
                }
            },
            {
                name: 'Temp',
                options: {
                    filter: false,
                    download: false,
                    display: 'excluded',
                    sortDirection: 'desc'
                }
            }
        ]
        const options = {
            selectableRows: false,
        }
        return (
            <div className="dashboard">
                {(room && !loading) && <div className="room-details">
                    <h1 className="gradient-text">
                        { room.name }
                    </h1>
                    <div className="room-table">
                        <MuiThemeProvider theme={getMUITheme()}><MUIDataTable        
                            title='Entry List'
                            data={data}
                            columns={columns}
                            options={{...options, downloadOptions: {
                                filename: `${room.name}-entrylist.csv`
                            }}}
                        /></MuiThemeProvider>
                    </div>
                </div>}
                {loading && <div className="center all loading">
                    <CircularProgress size={70} thickness={5} className="progress"/>
                </div>}
            </div>
        )
    }
}

export default withRouter(connect()(RoomDetails))
