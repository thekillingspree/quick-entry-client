import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import QRCode from 'qrcode.react';
import IconButton from '@material-ui/core/IconButton';
import '../styles/dashboard.css';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import CircularProgress from '@material-ui/core/CircularProgress'; 
import { authMapStateToProps } from '../utils';

class UserDashboard extends Component {

    state = {
        color: '#9a81d4',
        colorAnchor: null,
        size: 300,
        sizeAnchor: null,
    }

    downloadImage = () => {
        const qrcanvas = document.querySelector("#qr");
        const downloadLink = document.querySelector("#qr-download");

        downloadLink.setAttribute('href', qrcanvas.toDataURL('image/png'));
    }

    sizeSelect = e => {
        this.setState({sizeAnchor: e.currentTarget});
    }

    sizeClose = () => {
        this.setState({sizeAnchor: null});
    }   

    selectSize = size => {
        this.setState({size, sizeAnchor: null});
    }

    colorClick = e => {
        this.setState({colorAnchor: e.currentTarget});
    }

    colorClose = () => {
        this.setState({colorAnchor: null});
    }   

    selectColor = color  => {
        this.setState({color, colorAnchor: null});
    }

    componentDidMount() {
        const { _id } = this.props.user;
    }

    render() {
        let {fullname, email, username, tecid, _id} = this.props.user;
        const {color, size, sizeAnchor, colorAnchor} = this.state;
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
                    <div className="center all">
                        <button className="button" onClick={this.sizeSelect}>Select Size</button>     
                        <button className="button" onClick={this.colorClick}>Select Color</button>     
                        <Menu id="size"
                            anchorEl={sizeAnchor}
                            open={!!sizeAnchor}
                            onClose={this.sizeClose}
                        >
                            <MenuItem onClick={() => this.selectSize(300)}>300x300</MenuItem>
                            <MenuItem onClick={() => this.selectSize(500)}>500x500</MenuItem>
                            <MenuItem onClick={() => this.selectSize(800)}>800x800</MenuItem>
                        </Menu>
                        <Menu id="color"
                            anchorEl={colorAnchor}
                            open={!!colorAnchor}
                            onClose={this.colorClose}
                        >
                            <MenuItem onClick={() => this.selectColor('#9a81d4')}>
                                <span className="color-box" style={{background: '#9a81d4'}}></span>
                                Quick-Entry
                            </MenuItem>
                            <MenuItem onClick={() => this.selectColor('#fc5c65')}>
                                <span className="color-box" style={{background: '#fc5c65'}}></span>
                                Fusion Red
                            </MenuItem>
                            <MenuItem onClick={() => this.selectColor('#26de81')}>
                                <span className="color-box" style={{background: '#26de81'}}></span>
                                Grass Green
                            </MenuItem>
                            <MenuItem onClick={() => this.selectColor('#3867d6')}>
                                <span className="color-box" style={{background: '#3867d6'}}></span>
                                Royal Blue
                            </MenuItem>
                            <MenuItem onClick={() => this.selectColor('#2d3436')}>
                                <span className="color-box" style={{background: '#2d3436'}}></span>
                                Dracula
                            </MenuItem>
                            <MenuItem onClick={() => this.selectColor('#e84393')}>
                                <span className="color-box" style={{background: '#e84393'}}></span>
                                Prunus Pink
                            </MenuItem>
                        </Menu>
                    </div>
                    <QRCode value={tecid}
                    size={size}
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