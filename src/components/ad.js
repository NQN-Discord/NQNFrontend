import React, {Component} from 'react';
import {adDemoMode} from '../config.js';

export default class Ad extends Component {
  componentDidMount() {
    console.log(`Creating ad for ${this.props.id}. Format: ${this.props.format}`);
    const ad = window['nitroAds'].createAd(this.props.id, {
      "demo": adDemoMode,
      "refreshLimit": 10,
      "refreshTime": 90,
      "renderVisibleOnly": false,
      "refreshVisibleOnly": true,
      "sizes": this.props.sizes,
      "format": this.props.format,
      "anchor": "bottom",
      "mediaQuery": this.props.format === "anchor" && "(max-width: 992px)",
      "report": {
        "enabled": true,
        "wording": "Report Ad",
        "position": "top-right"
      }
    });
    this.setState({ad});
  }

  componentWillUnmount() {
    console.log(`Unloading ad for ${this.props.id}`);
    if (this.state.ad) {
      this.state.ad.onNavigate();
    }
  }

  render() {
    return <div id={this.props.id}/>;
  }
}