// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './LCRInformation.css';
import routes from '../constants/routes.json';
import pm6306 from "../utils/pm6306";
let convert = require('convert-units')

type Props = {

};

export default class LCRInformation extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    let default_value = "---";
    this.state = {
      mode: default_value,
      param: default_value,
      test_signal: default_value,
      trigger: default_value,
      average: default_value,
      frequency: default_value,
      ac_level: default_value,
      dc_bias: default_value,
      fixture: default_value,
      deviation: default_value,
      fast_measure: default_value,
      binning: default_value,
      fixed_position: default_value,
      range_hold: default_value,
      meas_voltage: default_value,
      meas_current: default_value
    };
  }

  format_fixture(fixture){
    fixture = Number(fixture.split(" ")[1]);
    let formatted_fixture = "UNKNOWN";
    switch(fixture){
      case 0:
        formatted_fixture = "<50 pF";
      break;
      case 1:
        formatted_fixture = "50-150 pF";
      break;
      case 2:
        formatted_fixture = "150-250 pF";
      break;
      case 3:
        formatted_fixture = "250-350 pF";
      break;
      case 4:
        formatted_fixture = "350-450 pF";
      break;
      case 5:
        formatted_fixture = "450-550 pF";
      break;
      case 6:
        formatted_fixture = "550-650 pF";
      break;
      case 7:
        formatted_fixture = "650-750 pF";
      break;
      case 8:
        formatted_fixture = "750-850 pF";
      break;
      case 9:
        formatted_fixture = "850-890 pF";
      break;
      case 10:
        formatted_fixture = "950-1050 pF";
      break;
      default:
        formatted_fixture = "UNKNOWN";
    }
    return formatted_fixture;
  }
  format_mode(mode){
    return mode.split(" ")[1];
  }
  format_param(param){
    return param.split(" ")[1];
  }
  format_frequency(frequency){
    let frequency_val = frequency.split(" ")[1];
    let converted_frequency = convert(frequency_val).from('Hz').toBest();
    return `${converted_frequency.val} ${converted_frequency.unit}`;
  }
  format_ac_level(ac_level){
    let ac_level_val = ac_level.split(" ")[1];
    let converted_ac_level = convert(ac_level_val).from('V').toBest()
    return `${converted_ac_level.val} ${converted_ac_level.unit}`;
  }
  format_dc_bias(dc_bias_enabled, dc_bias){
    let dc_bias_status = dc_bias_enabled.split(" ")[1] != "OFF"
    if(dc_bias_status){
      let dc_bias_val = dc_bias.split(" ")[1];
      let converted_dc_bias = convert(dc_bias_val).from('V').toBest()
      return `${converted_dc_bias.val} ${converted_dc_bias.unit}`;
    }
    else{
      return "OFF";
    }
  }
  format_fixed_position(fixed_position){
    return fixed_position.split(" ")[1];
  }
  format_range_hold(range_hold){
    return range_hold.split(" ")[1];
  }
  format_average(average){
   return average.split(" ")[1];
  }
  componentDidMount() {
    pm6306.send_message("*LRN?").then((result)=>{
      let [mode,param,test_signal, trigger, average,frequency,ac_level,dc_bias,dc_bias_enabled,fixture,deviation,fast_measure,binning, fixed_position, range_hold] = result.split(";")
      console.log(result)
      let state_copy = this.state;

      state_copy.mode = this.format_mode(mode);
      state_copy.param = this.format_param(param);
      state_copy.test_signal = test_signal;
      state_copy.trigger = trigger;
      state_copy.average = this.format_average(average);
      state_copy.frequency = this.format_frequency(frequency);
      state_copy.ac_level = this.format_ac_level(ac_level);
      state_copy.dc_bias = this.format_dc_bias(dc_bias_enabled, dc_bias);
      state_copy.fixture = this.format_fixture(fixture);
      state_copy.deviation = deviation;
      state_copy.fast_measure = fast_measure;
      state_copy.binning = binning;
      state_copy.fixed_position = this.format_fixed_position(fixed_position);
      state_copy.range_hold = this.format_range_hold(range_hold);

      this.setState(state_copy);
    });

    this.start_timer();
  }
  start_timer(){
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  stop_timer(){
    clearInterval(this.timerID);
  }
  componentWillUnmount() {
    this.stop_timer();
  }
  tick() {
    this.stop_timer();
    pm6306.send_message("vol?;cur?").then((result)=>{
      const regexp = /(\w)\s([0-9-E\.]+);?/g;
      const readings = [...result.matchAll(regexp)];
      let state_copy = this.state;

      if(readings.length == 0){
      }
      else{
        if(readings.length > 1){
          let current_val = Number(readings[1][2]);
          let converted_current = convert(current_val).from('A').toBest({cutOffNumber: 0.1, reverse:true, maxNumber: 1000})
          let rounded_current = Math.round(converted_current.val * 100) / 100;
          state_copy.meas_current = `${rounded_current} ${converted_current.unit}`;

        }
        let voltage_val = Number(readings[0][2]);
        let converted_voltage = convert(voltage_val).from('V').toBest({reverse:true, maxNumber: 1000})
        let rounded_voltage = Math.round(converted_voltage.val * 100) / 100;
        state_copy.meas_voltage = `${rounded_voltage} ${converted_voltage.unit}`;
      }
      this.setState(state_copy);
      this.start_timer();

    });
    // pm6306.send_message("CURRENT?").then((result)=>{
    // });
    // pm6306.send_message("component?").then((result)=>{
    //   let [,primary_parameter, raw_primary_value, secondary_parameter, raw_secondary_value] = result.match(/^(\w)\s(.+);(\w)\s(.+)$/);
    //   let primary_value = this.format_component(primary_parameter, raw_primary_value);
    //   let secondary_value = this.format_component(secondary_parameter, raw_secondary_value);
    //   this.setState({
    //     primary_parameter: primary_parameter,
    //     primary_value: primary_value.val,
    //     primary_units: primary_value.label,

    //     secondary_parameter: secondary_parameter,
    //     secondary_value: secondary_value.val,
    //     secondary_units: secondary_value.label
    //   });
    // });
  }

  render() {

    const {
    } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className={`col-5 p-0`}>
            <div className={`card bg-secondary ${styles.info_panel1}`} >
              <div className="card-header text-center p-0" >
                <strong>Acquisition</strong>
              </div>
              <div className="card-body p-0" >
                <table className="table table-dark table-sm m-0">
                  <tbody>
                    <tr>
                      <td className="text-center table-dark"><strong>Frequency</strong></td>
                      <td className="text-center table-active">{this.state.frequency}</td>
                      <td className="text-center table-dark"><strong>Fixture</strong></td>
                      <td className="text-center table-active">{this.state.fixture}</td>
                    </tr>
                    <tr>
                      <td className="text-center table-dark"><strong>Avg Count</strong></td>
                      <td className="text-center table-active">{this.state.average}</td>
                      <td className="text-center table-dark"><strong>Range</strong></td>
                      <td className="text-center table-active">{this.state.range_hold}</td>
                    </tr>
                    <tr>
                      <td className="text-center table-dark"><strong>AC Level</strong></td>
                      <td className="text-center table-active">{this.state.ac_level}</td>
                      <td className="text-center table-dark"><strong>DC BIAS</strong></td>
                      <td className="text-center table-active">{this.state.dc_bias}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className={`col-4 p-0`}>
            <div className={`card bg-secondary ${styles.info_panel2}`} >
              <div className="card-header text-center p-0" >
                <strong>LCR</strong>
              </div>
              <div className="card-body p-0" >
                <table className="table table-dark table-sm m-0">
                  <tbody>
                    <tr>
                      <td className="text-center table-dark"><strong>Position</strong></td>
                      <td className="text-center table-active">{this.state.fixed_position}</td>
                      <td className="text-center table-dark"><strong>Range</strong></td>
                      <td className="text-center table-active">{this.state.range_hold}</td>
                    </tr>
                    <tr>
                      <td className="text-center table-dark"><strong>Mode</strong></td>
                      <td className="text-center table-active">{this.state.mode}</td>
                      <td className="text-center table-dark"><strong>Param</strong></td>
                      <td className="text-center table-active">{this.state.param}</td>
                    </tr>
                    <tr>
                      <td className="text-center table-dark"><strong>&nbsp;</strong></td>
                      <td className="text-center table-active"></td>
                      <td className="text-center table-dark"></td>
                      <td className="text-center table-active"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className={`col-3 p-0`}>
            <div className={`card bg-secondary ${styles.info_panel3}`} >
              <div className="card-body p-0" >
                <table className="table table-dark m-0">
                  <tbody>
                    <tr className={`${styles.info_panel3_tr}`}>
                      <td className="align-middle text-center table-dark">
                        <strong>Voltage</strong>
                      </td>
                      <td className="align-middle text-center table-active">
                        {this.state.meas_voltage}
                      </td>
                    </tr>
                    <tr className={`${styles.info_panel3_tr}`}>
                      <td className="align-middle text-center table-dark">
                        <strong>Current</strong>
                      </td>
                      <td className="align-middle text-center table-active">
                        {this.state.meas_current}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
