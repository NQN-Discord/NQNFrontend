import React, {Component} from 'react';
import './nord.css'
import classNames from "classnames";

export default class Nord extends Component {
  componentDidMount() {
    console.log(`Creating ad for NordVPN`);
  }

  render() {
    console.log(this.props);
    return (
      <div id="nordvpn" className={classNames({
        all: this.props.all,
        desktop_small: this.props.desktop_small,
        mobile_large: this.props.mobile_large
      })}>
        <a href="https://go.nordvpn.net/SH3L1" target="_blank" rel="noopener"/>
      </div>
    )
  }
}