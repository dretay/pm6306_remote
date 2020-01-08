import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import pm6306 from '../utils/pm6306';
import styles from './SweepPanel.css';

import {exec} from 'child_process';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';

import Frequency from './acquisition/Frequency'
import Fixture from './acquisition/Fixture'
import AvgCount from './acquisition/AvgCount'
import DCBias from './acquisition/DCBias'
import ACLevel from './acquisition/ACLevel'
import BiasVoltage from './acquisition/BiasVoltage'
import Dropdown from 'react-bootstrap/Dropdown';
import primary_options from '../constants/primary_options.json';
import secondary_options from '../constants/secondary_options.json';
import KeypadModal from './KeypadModal';

import * as shortid from 'shortid';

type Props = {
};
export default function SweepPanel({
}: Props) {

  const [primary_component, setPrimaryComponent] = useState(localStorage.getItem('primary_component') || "C");
  const [secondary_component, setSecondaryComponent] = useState(localStorage.getItem('secondary_component') || "IMPEDANCE");
  const [start_frequency, setStartFrequency] = useState(Number(localStorage.getItem('start_frequency')) || 100);
  const [stop_frequency, setStopFrequency] = useState(localStorage.getItem('stop_frequency') || 1000);
  const [ac_level, setAcLevel] = useState(Number(localStorage.getItem('ac_level')) || 1);
  const [dc_bias, setDcBias] = useState(localStorage.getItem('dc_bias') || "OFF");
  const [bias_voltage, setBiasVoltage] = useState(Number(localStorage.getItem('bias_voltage')) || 0);
  const [step_size, setStepSize] = useState(Number(localStorage.getItem('step_size')) || 100);

  useEffect(()=>{
    localStorage.setItem('primary_component', primary_component);
  }, [primary_component]);
  let set_primary_callback = (e)=>{
    let argument = e.target.getAttribute("argument") || "";
    setPrimaryComponent(argument);
  }

  useEffect(()=>{
    localStorage.setItem('secondary_component', secondary_component);
  }, [secondary_component]);
  let set_secondary_callback = (e)=>{
    let argument = e.target.getAttribute("argument") || "";
    setSecondaryComponent(argument);
  }

  useEffect(()=>{
    localStorage.setItem('start_frequency', start_frequency);
  }, [start_frequency]);
  let set_start_frequency_callback = (command, value)=>{
    setStartFrequency(value);
  }

  useEffect(()=>{
    localStorage.setItem('stop_frequency', stop_frequency);
  }, [stop_frequency]);
  let set_stop_frequency_callback = (command, value)=>{
    setStopFrequency(value);
  }

  useEffect(()=>{
    localStorage.setItem('ac_level', ac_level);
  }, [ac_level]);
  let set_ac_level_callback = (command, value)=>{
    setAcLevel(value);
  }

  useEffect(()=>{
    localStorage.setItem('dc_bias', dc_bias);
  }, [dc_bias]);
  let set_dc_bias_callback = (command, value)=>{
    setDcBias(value);
  }

  useEffect(()=>{
    localStorage.setItem('bias_voltage', bias_voltage);
  }, [bias_voltage]);
  let set_bias_voltage_callback = (command, value)=>{
    setBiasVoltage(value);
  }

  useEffect(()=>{
    localStorage.setItem('step_size', step_size);
  }, [step_size]);
  let set_step_size_callback = (command, value)=>{
    setStepSize(Number(value));
  }
  const primary_dropdown_values = []
  for (const [index, value] of primary_options.entries()) {
    primary_dropdown_values.push(
      <Dropdown.Item
        className={``}
        key={shortid.generate()}
        command={value.command}
        argument={value.argument}
        onClick={set_primary_callback}>
        {value.label}
      </Dropdown.Item>
    );
  }


  const secondary_dropdown_values = []
  for (const [index, value] of secondary_options.entries()) {
    secondary_dropdown_values.push(
      <Dropdown.Item
        className={``}
        key={shortid.generate()}
        command={value.command}
        argument={value.argument}
        onClick={set_secondary_callback}>
        {value.label}
      </Dropdown.Item>
    );
  }

  return (
  <>
    <div className={`container-fluid ${styles.paramter_table}`}>
      <div className="row">
        <table className="table table-dark table-sm m-0 text-center">
          <tbody>
            <tr>
              <td>
                <strong>Primary</strong>
              </td>
              <td>
                <Dropdown drop="down" className={`p-0 `}>
                  <Dropdown.Toggle variant="dark" className={`p-0 dropdown`}>
                    {primary_component}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {primary_dropdown_values}
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Secondary</strong>
              </td>
              <td>
                <Dropdown drop="down" className={`p-0 `}>
                  <Dropdown.Toggle variant="dark" className={`p-0 dropdown`}>
                    {secondary_component}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {secondary_dropdown_values}
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
            <tr>
              <Frequency label="Start Frequency" value={start_frequency} callback={set_start_frequency_callback}/>
            </tr>
            <tr>
              <Frequency label="Stop Frequency" value={stop_frequency} callback={set_stop_frequency_callback}/>
            </tr>
            <tr>
              <ACLevel value={ac_level} callback={set_ac_level_callback}/>
            </tr>
            <tr>
              <DCBias value={dc_bias} callback={set_dc_bias_callback}/>
            </tr>
            <tr>
              <BiasVoltage value={bias_voltage} callback={set_bias_voltage_callback}/>
            </tr>
            <tr>
            <td><strong>Step Size</strong></td>
              <td><KeypadModal command="FRE" button_label={step_size} callback={set_step_size_callback} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <footer className={`footer ${styles.footer_nav} w-100`}>
      <div className="container-fluid w-100">
        <div className="d-flex">
            <div>
              <Link to={routes.HOME}>
                <Button className={`float-left ${styles.nav_button}`}  variant="warning">
                  Back
                </Button>
              </Link>
            </div>
            <div className="ml-auto">
              <Link to={{
                pathname: routes.SWEEPVIEWER,
                state:{
                  primaryComponent: primary_component,
                  secondaryComponent: secondary_component,
                  startFrequency: start_frequency,
                  stopFrequency: stop_frequency,
                  acLevel: ac_level,
                  dcBias: dc_bias,
                  biasVoltage: bias_voltage,
                  stepSize: step_size
                }
              }}>
                <Button className={`float-right ${styles.nav_button}`}  variant="success">
                  Start
                </Button>
              </Link>
            </div>
        </div>
      </div>
    </footer>
  </>
  );
}
