import React, { useState,useEffect } from 'react';

import LCRReading from './LCRReading';
import LCRInformation from './LCRInformation';
import pm6306 from '../utils/pm6306';
import primary_options from '../constants/primary_options.json';
import secondary_options from '../constants/secondary_options.json';
import styles from './FrontPanel.css';

type Props = {
};
export default function FrontPanel({
}: Props) {
  let default_value = '---';
  const [isActive, setIsActive] = useState(true);

  const [primary_value, setPrimaryValue] = useState(default_value);
  const [primary_parameter, setPrimaryParameter] = useState(default_value);

  const [secondary_value, setSecondaryValue] = useState(default_value);
  const [secondary_parameter, setSecondaryParameter] = useState(default_value);

  const [measured_voltage, setMeasuredVoltage] = useState(default_value);
  const [measured_current, setMeasuredCurrent] = useState(default_value);

  const [device_setup, setDeviceSetup] = useState("");

  const toggle_polling = (value)=>{
    setIsActive(value);
  }
  function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async function get_device_setup() {
    setIsActive(false);
    let data = await pm6306.send_message("*LRN?");
    setDeviceSetup(data);
    await sleep(100);
    setIsActive(true);
  };
  async function change_parameter_from_event(e){
    setIsActive(false);
    await pm6306.send_message(e.target.getAttribute("value"));
    await get_device_setup();
  };
  async function change_parameter_from_value(value){
    setIsActive(false);
    await pm6306.send_message(value);
    await get_device_setup();
  }
  useEffect(() => {
    pm6306.send_message(`CONTIN`);
  },[]);

  useEffect(() => {
    let timerID = null;
    if(isActive){
      timerID = setInterval(()=>{
        setIsActive(false);
        pm6306.send_message('com?;vol?;cur?').then(result => {
          const regexp = /((\w)\s([0-9-E\.]+)|over)/g;
          const readings = [...result.matchAll(regexp)];

          //handle overrange
          if(readings[0][0] === "over"){
            setPrimaryParameter(default_value);
            setPrimaryValue(default_value);
          }else{
            setPrimaryParameter(readings[0][2]);
            setPrimaryValue(readings[0][3]);
          }

          //annoyingly when there is only a dominant parameter 3 values are returned
          if (readings.length == 3) {
            setMeasuredVoltage(readings[1][3]);
            setMeasuredCurrent(readings[2][3]);
          } else {
            //handle overrange
            if(readings[1][0] === "over"){
              setSecondaryParameter(default_value);
              setSecondaryValue(default_value);
            }else{
              setSecondaryParameter(readings[1][2]);
              setSecondaryValue(readings[1][3]);
            }
            setMeasuredVoltage(readings[2][3]);
            setMeasuredCurrent(readings[3][3]);
          }

          setIsActive(true);
        });
      }, 500);
    }
    else if(!isActive){
      clearInterval(timerID);
    }
    return () => clearInterval(timerID);

  },[isActive, primary_value, primary_parameter, secondary_value, secondary_parameter, measured_voltage, measured_current]);
  useEffect(() => {
    get_device_setup();
  },[]);

  return (
    <div className="container-fluid">
      <div className="row">
        <LCRInformation
          measured_voltage={measured_voltage}
          measured_current={measured_current}
          device_setup={device_setup}
          toggle_polling={setIsActive}
          callback={change_parameter_from_value}
        />
      </div>
      <div className="row">
        <LCRReading
          value={primary_value}
          parameter={primary_parameter}
          options={primary_options}
          dropdir="right"
          variant="text-success"
          callback={change_parameter_from_event}
        />
      </div>
      <div className="row">
        <LCRReading
          value={secondary_value}
          parameter={secondary_parameter}
          options={secondary_options}
          dropdir="up"
          variant="text-info"
          callback={change_parameter_from_event}
        />
      </div>
    </div>
  );
}
