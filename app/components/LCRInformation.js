import React, { useState, useRef, useEffect } from 'react';
let convert = require('convert-units');

import KeypadModal from './KeypadModal';
import PopoverChooser from './PopoverChooser';
import DropdownChooser from './DropdownChooser';

import Frequency from './acquisition/Frequency'
import Fixture from './acquisition/Fixture'
import AvgCount from './acquisition/AvgCount'
import DCBias from './acquisition/DCBias'
import ACLevel from './acquisition/ACLevel'
import BiasVoltage from './acquisition/BiasVoltage'

import styles from './LCRInformation.css';
import pm6306 from '../utils/pm6306';

import fixture_choices from '../constants/fixtures.json';

import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';


function format_voltage(voltage) {
  let voltage_val = Number(voltage);
  let converted_voltage = convert(voltage_val)
    .from('V')
    .toBest({ reverse: true, maxNumber: 1000 });
  let rounded_voltage = Math.round(converted_voltage.val * 100) / 100;
  return `${rounded_voltage} ${converted_voltage.unit}`;
}
function format_current(current) {
  let current_val = Number(current);
  let converted_current = convert(current_val)
    .from('A')
    .toBest({ cutOffNumber: 0.1, reverse: true, maxNumber: 1000 });
  let rounded_current = Math.round(converted_current.val * 100) / 100;
  return `${rounded_current} ${converted_current.unit}`;
}


type Props = {
  measured_voltage: string,
  measured_current: string,
  device_setup: string,
  toggle_polling: () => void,
  callback: () => void
};
export default function LCRInformation({
  measured_voltage,
  measured_current,
  device_setup,
  toggle_polling,
  callback
}: Props) {
  let [
    mode,
    param,
    test_signal,
    trigger,
    average,
    frequency,
    ac_level,
    bias_voltage,
    dc_bias,
    fixture,
    deviation,
    fast_measure,
    binning,
    fixed_position,
    range_hold
  ] = device_setup.split(';');


  let formatted_voltage = format_voltage(measured_voltage);
  let formatted_current = format_current(measured_current);

  const [polling_disabled, setPollingDisabled] = useState(false);

  const toggle_sampling = ()=>{
    if(polling_disabled){
      toggle_polling(true);
      setPollingDisabled(false);
    }
    else{
      toggle_polling(false);
      setPollingDisabled(true);
    }
  }

  let polling_status_message = <div><div className={`${styles.status_spinner} spinner-grow`}><span className="sr-only"></span></div>&nbsp;Polling...&nbsp;</div>;
  if(polling_disabled){
    polling_status_message = "Idle"
  }

  return (
    <>
      <div className={`col-8 p-0`}>
        <div className={`card bg-secondary ${styles.info_panel1}`}>
          <div className="card-header text-center p-0">
            <Link to={routes.HOME}>
              <Button className={`${styles.home_button} p-0 float-left`}  variant="warning">
                &nbsp;<i className="fas fa-arrow-left"></i>&nbsp;
              </Button>
            </Link>
          </div>
          <div className="card-body p-0">
            <table className="table table-dark table-sm m-0">
              <tbody>
                <tr>
                  <Frequency value={frequency} callback={callback}/>
                  <Fixture value={fixture} callback={callback}/>
                </tr>
                <tr>
                  <AvgCount value={average} callback={callback}/>
                  <DCBias value={dc_bias} callback={callback}/>
                </tr>
                <tr>
                  <ACLevel value={ac_level} callback={callback}/>
                  <BiasVoltage value={bias_voltage} callback={callback}/>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={`col-4 pl-0 pr-0 `}>
        <div className={`card bg-secondary ${styles.info_panel2} h-100`}>
          <div className="card-header text-center p-0">

            <div className="container-fluid">
              <div className="row justify-content-between">
                <div className="col-4 pl-0">
                </div>
                <div className="col-6 pr-0">
                  <Button className={`${styles.home_button} p-0 float-right`} onClick={toggle_sampling} variant={polling_status_style}>
                    {polling_status_message}
                  </Button>

                </div>
              </div>
            </div>
          </div>
          <div className={`card-body p-0 h-100`}>
            <table className="table table-dark table-sm m-0 h-100">
              <tbody>
                <tr className={`${styles.info_reading} h-50 `}>
                  <td className="align-middle">Voltage</td>
                  <td className="align-middle">{formatted_voltage}</td>
                </tr>
                <tr className={`${styles.info_reading} h-50 `}>
                  <td className="align-middle">Current</td>
                  <td className="align-middle">{formatted_current}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
