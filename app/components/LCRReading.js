// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './LCRReading.css';
import routes from '../constants/routes.json';
import PrimaryLCRReading from './PrimaryLCRReading'
import SecondaryLCRReading from './SecondaryLCRReading'

type Props = {
  primary_parameter: string,
  primary_value: string,
  secondary_parameter: string,
  secondary_value: string
};

export default class Parameters extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
  }




  render() {

    // const {primary_parameter,secondary_parameter} = this.props;

    // const {val: primary_value, label:primary_units} = this.format_component(primary_parameter, this.props.primary_value);
    // const {val: secondary_value, label: secondary_units} = this.format_component(secondary_parameter, this.props.secondary_value);

    return (
      <div className="container">
        <div className="row">
          <div className="col-12 p-0">
            <table className="table table-dark">
              <tbody>
                <PrimaryLCRReading parameter = {this.props.primary_parameter} value={this.props.primary_value}/>
                <SecondaryLCRReading parameter = {this.props.secondary_parameter} value={this.props.secondary_value}/>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
