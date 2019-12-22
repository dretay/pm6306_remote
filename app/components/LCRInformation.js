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
      range_hold: default_value
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
      this.setState({
        mode: this.format_mode(mode),
        param: this.format_param(param),
        test_signal: test_signal,
        trigger: trigger,
        average: this.format_average(average),
        frequency: this.format_frequency(frequency),
        ac_level: this.format_ac_level(ac_level),
        dc_bias: this.format_dc_bias(dc_bias_enabled, dc_bias),
        fixture: this.format_fixture(fixture),
        deviation: deviation,
        fast_measure: fast_measure,
        binning: binning,
        fixed_position: this.format_fixed_position(fixed_position),
        range_hold: this.format_range_hold(range_hold)
      });
    });
  }

  render() {

    const {
    } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className={`col-7 p-0`}>
            <div className={`card bg-secondary ${styles.info_panel1}`} >
              <div className="card-header text-center p-0" >
                <strong>Acquire</strong>
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
          <div className={`col-5 p-0`}>
            <div className={`card bg-secondary ${styles.info_panel1}`} >
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
        </div>
      </div>
    );
  }
}
