import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {Navbar, Nav, NavItem} from "react-bootstrap";
import {Switch, withRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


class Header extends Component {
    render() {
        return (
            <Navbar inverse={true} fluid={true} onSelect={(eventKey) => {
                this.props.history.push(eventKey);
            }}>
                <Nav activeKey={this.props.location.pathname} className="navbar-right">
                    {!this.props.loggedIn &&
                        <NavItem eventKey="/login">
                            Login
                        </NavItem>
                    }
                    {this.props.loggedIn &&
                        <NavItem eventKey="/logout">
                            Logout
                        </NavItem>
                    }
                </Nav>
            </Navbar>
        );
    }
}


const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    }
};

const mapDispatchToProps = dispatch => {
    return {}
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Header));