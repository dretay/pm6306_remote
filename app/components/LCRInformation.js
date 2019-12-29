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
  callback: () => void
};
export default function LCRInformation({
  measured_voltage,
  measured_current,
  device_setup,
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

  return (
    <>
      <div className={`col-8 p-0`}>
        <div className={`card bg-secondary ${styles.info_panel1}`}>
          <div className="card-header text-center p-0">
            <strong>Acquisition</strong>
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
        <div className={`card bg-secondary ${styles.info_panel2}`}>
          <div className={`card-body p-0`}>
            <table className="table table-dark m-0 h-100">
              <tbody>
                <tr className={`${styles.info_panel2_tr}`}>
                  <td className="align-middle text-center table-dark">
                    <strong>Voltage</strong>
                  </td>
                  <td className="align-middle text-center table-active">
                    {formatted_voltage}
                  </td>
                </tr>
                <tr className={`${styles.info_panel2_tr}`}>
                  <td className="align-middle text-center table-dark">
                    <strong>Current</strong>
                  </td>
                  <td className="align-middle text-center table-active">
                    {formatted_current}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
