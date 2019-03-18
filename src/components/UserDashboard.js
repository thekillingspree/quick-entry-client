import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import QRCode from 'qrcode.react';
import IconButton from '@material-ui/core/IconButton';
import '../styles/dashboard.css';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import CircularProgress from '@material-ui/core/CircularProgress'; 
import { authMapStateToProps } from '../utils';

class UserDashboard extends Component {

    state = {
        color: '#9a81d4',
        size: 500
    }

    downloadImage = () => {
        const qrcanvas = document.querySelector("#qr");
        const downloadLink = document.querySelector("#qr-download");

        downloadLink.setAttribute('href', qrcanvas.toDataURL('image/png'));
    }

    componentDidMount() {
        const { _id } = this.props.user;
    }

    render() {
        let {fullname, email, username, tecid, _id} = this.props.user;
        const {color} = this.state;
        console.log(fullname)
        return (
            <div className="dashboard">
                <nav>
                    <IconButton style={{marginRight: 20}}>
                        <MenuIcon />
                    </IconButton>
                    <div>
                        <h4 className="gradient-text">Hi,</h4>
                        <h1 className="gradient-text">{fullname}</h1>
                        <p className="light-text">{`@${username}`}</p>
                    </div>
                </nav>
                <div className="center all vertical">
                    <h3>Your QRCode</h3>
                    <p>Use this QRCode to enter any room.</p>
                    <QRCode value={tecid}
                    size={500}
                    bgColor={"#ffffff"}
                    fgColor={color}
                    level={"L"}
                    id='qr'
                    includeMargin={true}
                    renderAs={"canvas"} />
                    <a id="qr-download" download="Quick-Entry-QRCode" className="button" onClick={this.downloadImage}>Download</a>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(authMapStateToProps)(UserDashboard))