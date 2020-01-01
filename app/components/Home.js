// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';
import Button from 'react-bootstrap/Button';
import meter_icon from '../../resources/icons/meter.svg'
import graph_icon from '../../resources/icons/graph.svg'
import dispatch_icon from '../../resources/icons/dispatch.svg'
import system_icon from '../../resources/icons/system.svg'

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className="container-fluid h-100">
        <div className="row align-middle h-100">
          <div className="col">
          </div>
          <div className="col-8 align-self-center">
            <Link to={routes.FRONTPANEL}>
              <Button className={`${styles.meter_function_button}`} variant="secondary"><img src={meter_icon}/>Meter</Button>
            </Link>
            <Link to={routes.SWEEPCONFIG}>
              <Button className={`${styles.meter_function_button}`}  variant="secondary"><img src={graph_icon}/>Sweeping</Button>
            </Link>
            <Button className={`${styles.meter_function_button}`}  variant="secondary"><img src={dispatch_icon}/>Binning</Button>
            <Link to={routes.SYSTEMCONFIG}>
              <Button className={`${styles.meter_function_button}`}  variant="secondary"><img src={system_icon}/>System</Button>
            </Link>
          </div>
          <div className="col">
          </div>
        </div>
      </div>


    );
  }
}
