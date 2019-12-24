// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './LCRInformation.css';
import routes from '../constants/routes.json';
import pm6306 from "../utils/pm6306";
let convert = require('convert-units');
import Dropdown from 'react-bootstrap/Dropdown';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

type Props = {
  measured_voltage: string,
  measured_current: string
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

  }


  format_voltage(voltage){
    let voltage_val = Number(voltage);
    let converted_voltage = convert(voltage_val).from('V').toBest({reverse:true, maxNumber: 1000})
    let rounded_voltage = Math.round(converted_voltage.val * 100) / 100;
    return `${rounded_voltage} ${converted_voltage.unit}`
  }
  format_current(current){
    let current_val = Number(current);
    let converted_current = convert(current_val).from('A').toBest({cutOffNumber: 0.1, reverse:true, maxNumber: 1000})
    let rounded_current = Math.round(converted_current.val * 100) / 100;
    return `${rounded_current} ${converted_current.unit}`;

  }

  render() {

    let measured_voltage = this.format_voltage(this.props.measured_voltage);
    let measured_current = this.format_current(this.props.measured_current);

    const popover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Popover right</Popover.Title>
        <Popover.Content>

          <div className="btn-group-vertical ml-4 mt-4" role="group" aria-label="Basic example">
              <div className="btn-group">
                  <input className={`text-center form-control-lg mb-2 ${styles.input_text}`} id="code"/>
              </div>
              <ButtonGroup >
                <Button variant="light" className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}>7</Button>
                <Button variant="light" className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}>8</Button>
                <Button variant="light" className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}>9</Button>
                <Button variant="light" className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}>k</Button>
                <Button variant="light" className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}>m</Button>
                <Button variant="light" className={`btn btn-outline-secondary py-3 ${styles.wide_keypad_button}`}>Enter</Button>
              </ButtonGroup>
              <ButtonGroup >
                <Button variant="light" className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}>4</Button>
                <Button variant="light" className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}>5</Button>
                <Button variant="light" className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}>6</Button>
                <Button variant="light" className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}>M</Button>
                <Button variant="light" className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}>µ</Button>
                <Button variant="light" className={`btn btn-outline-secondary py-3 ${styles.wide_keypad_button}`}>Back</Button>
              </ButtonGroup>
              <ButtonGroup >
                <Button variant="light" className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}>1</Button>
                <Button variant="light" className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}>2</Button>
                <Button variant="light" className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}>3</Button>
                <Button variant="light" className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}>G</Button>
                <Button variant="light" className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}>n</Button>
                <Button variant="light" className={`btn btn-outline-secondary py-3 ${styles.wide_keypad_button}`}>Clear</Button>
              </ButtonGroup>
              <ButtonGroup >
                <Button variant="light" className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}>0</Button>
                <Button variant="light" className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}>.</Button>
                <Button variant="light" className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}>±</Button>
                <Button variant="light" className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}>Exp</Button>
                <Button variant="light" className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}>p</Button>
                <Button variant="light" className={`btn btn-outline-secondary py-3 ml-10 ${styles.wide_keypad_button}`}>Exit</Button>
              </ButtonGroup>


          </div>
        </Popover.Content>
      </Popover>
    );


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
                      <td className="text-center table-active">

                        {this.state.frequency}
                      </td>
                      <td className="text-center table-dark"><strong>Fixture</strong></td>
                      <td className="text-center table-active">
                      <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="pt-0 pb-0">
                          {this.state.fixture}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>0-50 pF</Dropdown.Item>
                          <Dropdown.Item>50-150 pF</Dropdown.Item>
                          <Dropdown.Item>150-250 pF</Dropdown.Item>
                          <Dropdown.Item>250-350 pF</Dropdown.Item>
                          <Dropdown.Item>350-450 pF</Dropdown.Item>
                          <Dropdown.Item>450-550 pF</Dropdown.Item>
                          <Dropdown.Item>550-650 pF</Dropdown.Item>
                          <Dropdown.Item>650-750 pF</Dropdown.Item>
                          <Dropdown.Item>750-850 pF</Dropdown.Item>
                          <Dropdown.Item>850-890 pF</Dropdown.Item>
                          <Dropdown.Item>950-1050 pF</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center table-dark"><strong>Avg Count</strong></td>
                      <td className="text-center table-active">
                        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                          <Button variant="secondary" className="pt-0 pb-0">{this.state.average}</Button>
                        </OverlayTrigger>
                      </td>
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
                        {measured_voltage}
                      </td>
                    </tr>
                    <tr className={`${styles.info_panel3_tr}`}>
                      <td className="align-middle text-center table-dark">
                        <strong>Current</strong>
                      </td>
                      <td className="align-middle text-center table-active">
                        {measured_current}
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
