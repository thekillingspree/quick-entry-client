import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import red from '@material-ui/core/colors/red';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import '../styles/userauth.css';
import ErrorSnackbar from './ErrorSnackbar';
import { createNewRoom } from '../store/actions/admin';
import { errorMSP } from '../utils';
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
        this.handleClose = this.handleClose.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleClose() {
        this.setState({error: null})
    }

    handleSubmit(e) {
        e.preventDefault();
        let {name, roomnumber, capacity} = this.state;
        try {
            capacity = parseInt(capacity);
            roomnumber = parseInt(roomnumber);
        } catch (e) {
            return this.setState({error: "Please provide proper values."})
        }
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
            console.log(error);
            this.setState({dialog: false, error})
        });
    }

    render() {

        const {name, roomnumber, capacity, dialog, error} = this.state;
        return (
        <div className="signup">
            <Snackbar 
                    open={error}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    onClose={this.handleClose}>
                    <SnackbarContent
                        style={{backgroundColor: red[700] }}
                        action={[
                            <IconButton
                            key="close"
                            color="inherit"
                            onClick={this.handleClose}>
                                <CloseIcon />
                            </IconButton>
                        ]}
                        message={<span className="snackbar-message"><ErrorIcon style={{marginRight: 10}}/>{error}</span>}
                    />
            </Snackbar>
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
                type="number" 
                name="roomnumber" 
                placeholder="A unique room number"
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
