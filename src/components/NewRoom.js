import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { connect } from 'react-redux';
import '../styles/userauth.css';
class NewRoom extends Component {

    state = {
        name: "",
        roomnumber: "",
        capacity: null,
        dialog: false,
        error: null
    }

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {

        const {name, roomnumber, capacity, dialog, error} = this.state;
        return (
        <div className="signup">
        <div className="container">
            <h1 className="gradient-text">Create a new room.</h1>
            <form className="singup-form">
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
                
            </form>
        </div>
        </div>
        )
    }
}

export default connect()(NewRoom)
