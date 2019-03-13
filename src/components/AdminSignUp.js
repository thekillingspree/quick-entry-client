import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import red from '@material-ui/core/colors/red';
import '../styles/userauth.css';
import { authMapStateToProps } from '../utils';

class AdminSignUp extends Component {

    state = {
        username: "",
        fullname: "",
        email: "",
        password: "",
        dialog: false,
        error: null
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    closeDialog () {
        this.setState({dialog: false})
    }

    handleClose (event, reason) {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ error: false });
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        const {fullname, username, email, password, dialog, error} = this.state;
        const { type, secText, greeting, dialogText} = this.props;
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
                        message={<span className="snackbar-message"><ErrorIcon style={{marginRight: 10}}/>{this.props.error}</span>}
                    />
                </Snackbar>
                <Dialog
                open={dialog}
                onClose={this.closeDialog}
                disableBackdropClick
                disableEscapeKeyDown>
                    <DialogTitle>{dialogText}</DialogTitle>
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
                        <h1 className="gradient-text">{greeting}</h1>
                        <form onSubmit={this.handleSubmit} className="signup-form">
                            {type === "signup" && <label>
                            Full Name
                            <input 
                            type="text" 
                            name="fullname" 
                            placeholder="Admin Full Name"
                            value={fullname}
                            required
                            onChange={this.handleChange}/>
                            </label>}
                            <label>
                                Username
                                <input 
                                type="text" 
                                name="username" 
                                value={username}
                                autoComplete="username"
                                placeholder="Eg: johndoe123"
                                required
                                onChange={this.handleChange}/>
                            </label>
                            {type === "signup" && <label>
                                Email
                                <input 
                                type="email" 
                                name="email" 
                                value={email}
                                required
                                placeholder="john@doe.com"
                                onChange={this.handleChange}/>
                            </label>}
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
                            <button className="button">{secText}</button>
                            {type === "signup" && <Link className="signup-link" to="/admin/login">Already an Admin? Login Here.</Link>}
                            {type === "login" && <Link className="signup-link" to="/admin/signup">Not Signed up yet? Signup Here.</Link>}
                        </form>
                </div>
            </div>
        )
    }
}

export default connect(authMapStateToProps)(AdminSignUp);