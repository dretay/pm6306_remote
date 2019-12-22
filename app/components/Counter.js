// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Counter.css';
import routes from '../constants/routes.json';


type Props = {
  fetch_lcr_readings: () => void,
  primary_reading_units: string,
  primary_reading_value: number,
  secondary_reading_units: string,
  secondary_reading_value: number
};

export default class Counter extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
  }

  render() {

    // setTimeout(()=>{
    //   fetch_lcr_readings();
    // } ,1000);

    const {
      fetch_lcr_readings,
      primary_reading_units,
      primary_reading_value,
      secondary_reading_units,
      secondary_reading_value
    } = this.props;
    return (
      <div className="col-xs-12">
        <div className="card bg-light" style={{width: 350+'px'}}>
          <div className="card-header" style={{padding: 0}}>
            <strong>LCR</strong>
          </div>
          <div className="card-body" style={{padding: 0}}>
            <table className="table-borderless table-sm" style={{width: 350+'px'}}>
              <tbody>
                <tr>
                  <td className="text-center">
                    <h1 lass="display-4"><strong>{primary_reading_units}</strong>&nbsp;<strong>{primary_reading_value}</strong> </h1>
                  </td>
                </tr>
                <tr>
                  <td className="text-center">
                    <h1 lass="display-4"><strong>{secondary_reading_units}</strong>&nbsp;<strong>{secondary_reading_value}</strong> </h1>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
