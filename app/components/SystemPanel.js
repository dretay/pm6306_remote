import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import pm6306 from '../utils/pm6306';
import styles from './SystemPanel.css';

import {exec} from 'child_process';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';


type Props = {
};
export default function SystemPanel({
}: Props) {

  const [isActive, setIsActive] = useState(true);



  const start_single_zero_trim = () => {
    return pm6306.send_message("TRIM")
    // .then((result)=>{
    //   setTimeout(()=>{
    //     setDeviceSetup(result);
    //     setIsActive(true);
    //   },500);
    // });
  };
  function shutdown(callback){
    exec('shutdown now', function(error, stdout, stderr){ console.log(stdout); });
  }

  // useEffect(() => {
  //   let timerID = null;
  //   if(isActive){
  //     timerID = setInterval(()=>{
  //       setIsActive(false);
  //       pm6306.send_message('com?;vol?;cur?').then(result => {
  //         const regexp = /((\w)\s([0-9-E\.]+)|over)/g;
  //         const readings = [...result.matchAll(regexp)];

  //         //handle overrange
  //         if(readings[0][0] === "over"){
  //           setPrimaryParameter(default_value);
  //           setPrimaryValue(default_value);
  //         }else{
  //           setPrimaryParameter(readings[0][2]);
  //           setPrimaryValue(readings[0][3]);
  //         }

  //         //annoyingly when there is only a dominant parameter 3 values are returned
  //         if (readings.length == 3) {
  //           setMeasuredVoltage(readings[1][3]);
  //           setMeasuredCurrent(readings[2][3]);
  //         } else {
  //           //handle overrange
  //           if(readings[1][0] === "over"){
  //             setSecondaryParameter(default_value);
  //             setSecondaryValue(default_value);
  //           }else{
  //             setSecondaryParameter(readings[1][2]);
  //             setSecondaryValue(readings[1][3]);
  //           }
  //           setMeasuredVoltage(readings[2][3]);
  //           setMeasuredCurrent(readings[3][3]);
  //         }

  //         setIsActive(true);
  //       });
  //     }, 500);
  //   }
  //   else if(!isActive){
  //     clearInterval(timerID);
  //   }
  //   return () => clearInterval(timerID);

  // },[isActive, primary_value, primary_parameter, secondary_value, secondary_parameter, measured_voltage, measured_current]);
  // useEffect(() => {
  //   get_device_setup();
  // },[]);

  return (
   <div className="container-fluid h-100">
        <div className="row align-middle h-100">
          <div className="col">
          </div>
          <div className="col-4 align-self-center">
            <div class="row">
              <Button onClick={start_single_zero_trim} className={`${styles.system_panel_button}`} variant="secondary">Single Zero Trim</Button>
            </div>
            <div className="row">
              <Button onClick={shutdown} className={`${styles.system_panel_button}`} variant="secondary">Shutdown</Button>
            </div>
            <div className="row">
              <Link to={routes.HOME}>
                <Button className={`${styles.system_panel_button}`}  variant="secondary">Home</Button>
              </Link>
            </div>
          </div>
          <div className="col">
          </div>
        </div>
      </div>
  );
}
