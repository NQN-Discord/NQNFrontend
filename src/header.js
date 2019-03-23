import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {Navbar, Nav, NavItem} from "react-bootstrap";
import {withRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./header.css";
import Search from "./components/search";


class Header extends Component {
    render() {
        return (
            <div>
                <div className="results_search_bar">
                    { !(this.props.location.pathname === "/" && this.props.results.term.length === 0) &&
                        <Search initial={this.props.results.term}/>
                    }
                </div>
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
                        {this.props.loggedIn &&
                            <NavItem eventKey="/settings">
                                Settings
                            </NavItem>
                        }
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

const mapDispatchToProps = () => {
    return {}
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Header));