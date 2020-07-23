import React, {Component} from 'react';

import connect from "react-redux/es/connect/connect";
import classNames from "classnames";
import {TopHeader} from "../header";
import {Image} from 'semantic-ui-react';


class HomePage extends Component {
  render() {
    return (
      <div>
        {!this.props.loggedIn &&
          <TopHeader/>
        }
        <div className={classNames(
          "bot_branding",
          {
            "no_banner_margin": this.props.loggedIn
          }
          )}>
          <Image
            src="/wumpus_logo.png"
          />
          <div className="nqn nqn_name">
            Not Quite Nitro
          </div>
        </div>
      </div>
    )}
  }


const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn
  }
};

const mapDispatchToProps = () => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
