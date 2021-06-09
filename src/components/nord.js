import React, {Component} from 'react';
import './nord.css'
import classNames from "classnames";

import {enableNord} from "../config"

export default class Nord extends Component {
  componentDidMount() {
    console.log(`Creating ad for NordVPN`);
  }

  render() {
    if (!enableNord) {
      return <></>
    }
    return (
      <div id="nordvpn" className={classNames({
        all: this.props.all,
        desktop_small: this.props.desktop_small,
        mobile_large: this.props.mobile_large
      })}>
        <a href="https://nqn.blue/nord_redirects/website/SH3L1" target="_blank" rel="noopener noreferrer"/>
      </div>
    )
  }
}
