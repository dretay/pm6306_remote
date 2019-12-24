// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './FrontPanel.css';
import routes from '../constants/routes.json';
import LCRReading from './LCRReading'
import LCRInformation from './LCRInformation'
import pm6306 from "../utils/pm6306";

type Props = {

};

export default class FrontPanel extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = this.get_blank_state();
  }
  componentDidMount() {
    this.start_timer();
  }
  componentWillUnmount() {
    this.stop_timer();
  }
  stop_timer(){
    clearInterval(this.timerID);
  }
  start_timer(){
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  get_blank_state(){
    let default_value = "---";
    return {
      primary_parameter: default_value,
      primary_value: default_value,
      primary_units: default_value,

      secondary_parameter: default_value,
      secondary_value: default_value,
      secondary_units: default_value,

      measured_voltage: default_value,
      measured_current: default_value
    }
  }

  tick() {
    this.stop_timer();
    pm6306.send_message("com?;vol?;cur?").then((result)=>{
      let new_state = this.get_blank_state();
      const regexp = /((\w)\s([0-9-E\.]+)|over);?/g;
      const readings = [...result.matchAll(regexp)];

      new_state.primary_parameter = readings[0][2];
      new_state.primary_value = readings[0][3];

      //annoyingly when there is only a dominant parameter 3 values are returned
      if(readings.length == 3){
        new_state.meas_voltage = readings[1][3];
        new_state.meas_current = readings[2][3];
      }
      else{
        new_state.secondary_parameter = readings[1][2];
        new_state.secondary_value = readings[1][3];

        new_state.measured_voltage = readings[2][3];
        new_state.measured_current = readings[3][3];
      }
      this.setState(new_state);

      this.start_timer();
    });
  }

  render() {

    const {
    } = this.props;

    return (
      <div>
        <LCRInformation
          measured_voltage = {this.state.measured_voltage}
          measured_current = {this.state.measured_current}
        />
        <LCRReading
          primary_parameter = {this.state.primary_parameter}
          primary_value = {this.state.primary_value}
          secondary_parameter = {this.state.secondary_parameter}
          secondary_value = {this.state.secondary_value}
        />
      </div>
    );
  }
}
