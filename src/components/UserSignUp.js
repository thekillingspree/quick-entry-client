import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import '../styles/userauth.css';
import { API_URL } from '../utils';
import DialogActions from '@material-ui/core/DialogActions';
import { addError } from '../store/actions/errors';

class UserSignUp extends Component {

    state = {
        username: "",
        fullname: "",
        email: "",
        password: "",
        tecid: "",
        dialog: false,
        error: null
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    closeDialog () {
        this.setState({dialog: false})
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({dialog: true});
        const {fullname, username, email, password, tecid} = this.state;
        const userData = {
            fullname,
            username,
            email,
            password,
            tecid
        }
        axios.post(`${API_URL}/users/signup`, userData).then((res) => {
            console.log(res)
            this.closeDialog();
        }).catch((err) => {
            const msg = err.response.data.error;
            this.props.dispatch(addError(msg))
            this.closeDialog();
        });
    }

    render() {
        const {fullname, username, email, password, tecid, dialog} = this.state;
        return (
            <div className="signup">
                <Dialog
                    open={dialog}
                    onClose={this.closeDialog}
                    disableBackdropClick
                    disableEscapeKeyDown
                >
                <DialogTitle>Signing you up</DialogTitle>
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
                    <h1 className="gradient-text">Join Quick-Entry</h1>
                    <form onSubmit={this.handleSubmit} className="signup-form">
                        <label>
                            Full Name
                            <input 
                            type="text" 
                            name="fullname" 
                            placeholder="John Doe"
                            value={fullname}
                            required
                            onChange={this.handleChange}/>
                        </label>
                        <label>
                            Username
                            <input 
                            type="text" 
                            name="username" 
                            value={username}
                            placeholder="johndoe123"
                            required
                            onChange={this.handleChange}/>
                        </label>
                        <label>
                            Email
                            <input 
                            type="email" 
                            name="email" 
                            value={email}
                            required
                            placeholder="john@doe.com"
                            onChange={this.handleChange}/>
                        </label>
                        <label>
                            TEC ID
                            <input 
                            type="text" 
                            name="tecid" 
                            value={tecid}
                            required
                            placeholder="Your ID, for example: TU3F1718076"
                            onChange={this.handleChange}/>
                        </label>
                        <label>
                            Password
                            <input 
                            type="password" 
                            name="password" 
                            value={password}
                            required
                            placeholder="Strong Password"
                            autoComplete="new-password"
                            onChange={this.handleChange}/>
                        </label>
                        <button className="button">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect()(UserSignUp);