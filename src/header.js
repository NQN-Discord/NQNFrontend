import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {Navbar, Nav, NavItem} from "react-bootstrap";
import {withRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./header.css";
import {logout} from "./actions/auth";


class Header extends Component {
    render() {
        return (
            <div>
                <Navbar inverse={true} fluid={true} onSelect={(eventKey) => {
                    if (eventKey === "/logout") {
                        this.props.logout();
                        return
                    }
                    this.props.history.push(eventKey);
                }}>
                    <Nav activeKey={this.props.location.pathname} className="navbar-right">
                        <NavItem eventKey="/logout">
                            Logout
                        </NavItem>
                        <NavItem eventKey="/channels/">
                            Post
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        results: state.search
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Header));