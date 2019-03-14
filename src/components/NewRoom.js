import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import '../styles/userauth.css';
import ErrorSnackbar from './ErrorSnackbar';
import { createNewRoom } from '../store/actions/admin';
class NewRoom extends Component {

    state = {
        name: "",
        roomnumber: "",
        capacity: undefined,
        dialog: false,
        error: null
    }

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({error: null})
        let {name, roomnumber, capacity} = this.state;
        capacity = parseInt(capacity);
        if (capacity > 15000) {
            return this.setState({error: "We don't support stadiums yet 😅"})
        } else if (capacity < 4) {
            return this.setState({error: "Well that's a small room 😅 Minimum capacity is 4."})
        }

        this.setState({dialog: true})

        let room = {name, roomnumber, capacity}
        this.props.dispatch(createNewRoom(room)).then((result) => {
            this.props.history.push("/admin/dashboard");
        }).catch(error => {
            this.setState({dialog: false, error})
        });
    }

    render() {

        const {name, roomnumber, capacity, dialog, error} = this.state;
        return (
        <div className="signup">
            <Dialog
                open={dialog}
                onClose={this.closeDialog}
                disableBackdropClick
                disableEscapeKeyDown
                >
                <DialogTitle>Creating Room</DialogTitle>
                <DialogContent>
                    <DialogActions>
                        <CircularProgress className="progress" 
                        />
                        <DialogContentText>
                            Please Wait
                        </DialogContentText>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        <div className="container">
            {!!error && <ErrorSnackbar open message={error} />}
            <h1 className="gradient-text">Create a new room.</h1>
            <form onSubmit={this.handleSubmit} className="signup-form">
                <label>
                Room Name
                <input 
                type="text" 
                name="name" 
                placeholder="E.g: Library"
                value={name}
                required
                onChange={this.handleChange}/>
                </label>
                <label>
                Room Number
                <input 
                type="text" 
                name="roomnumber" 
                placeholder="301, 40A, B20"
                value={roomnumber}
                required
                onChange={this.handleChange}/>
                </label>
                <label>
                Total Capacity
                <input 
                type="number" 
                name="capacity" 
                placeholder="200"
                value={capacity}
                required
                onChange={this.handleChange}/>
                </label>
                <button className="button">DONE</button>
            </form>
        </div>
        </div>
        )
    }
}

export default withRouter(connect()(NewRoom))
