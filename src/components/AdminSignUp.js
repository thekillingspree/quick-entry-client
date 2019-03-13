import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogContentText from '@material-ui/core/DialogContentText';
import Snackbar from '@material-ui/core/Snackbar';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import red from '@material-ui/core/colors/red';
import '../styles/userauth.css';

class AdminSignUp extends Component {

    state = {
        username: "",
        fullname: "",
        email: "",
        password: "",
        dialog: false,
        error: null
    }

    render() {
        return (
            <div>
                Admin Sign Up Form
            </div>
        )
    }
}

export default connect()(AdminSignUp);