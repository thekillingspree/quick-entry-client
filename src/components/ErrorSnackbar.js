import React, { Component } from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import red from '@material-ui/core/colors/red';
import { removeError } from '../store/actions/errors';

class ErrorSnackbar extends Component {
    state = {
        open: false
    }

    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    componentWillUnmount() {
        this.props.dispatch(removeError());
    }

    componentDidMount() {
        if (this.props.open) {
            this.setState({open: true})
        }
    }

    handleClose() {
        this.setState({open: false})
    }

    render() {
        
        return (
            <Snackbar 
                open={this.state.open}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                onClose={this.props.handleClose}>
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
                    message={<span className="snackbar-message"><ErrorIcon style={{marginRight: 10}}/>{this.props.message}</span>}
                />
            </Snackbar>
        )
    }
}

export default connect()(ErrorSnackbar)
