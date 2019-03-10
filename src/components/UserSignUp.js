import React, { Component } from 'react';
import '../styles/userauth.css';

class UserSignUp extends Component {

    state = {
        username: "",
        fullname: "",
        email: "",
        password: "",
        tecid: ""
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const {fullname, username, email, password, tecid} = this.state;
        return (
            <div className="signup">
                <div className="container">
                    <h1 className="gradient-text">Join Quick-Entry</h1>
                    <form className="signup-form">
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

export default UserSignUp;