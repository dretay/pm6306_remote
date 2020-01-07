import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import pm6306 from '../utils/pm6306';
import styles from './SweepViewer.css';
import {format_component, extract_readings_from_response} from '../utils/lcrreading'

import {exec} from 'child_process';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import SweepChart from './SweepChart'

type Props = {
  location: object
};
export default function SweepPanel({
  location
}: Props) {



  const [primaryComponentData, setPrimaryComponentData] = useState([]);
  const [secondaryComponentData, setSecondaryComponentData] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [currFrequency, setCurrFrequency] = useState(0);
  const [stopFrequency, setStopFrequency] = useState(0);
  const [stepSize, setStepSize] = useState(0);
  const [stopSweep, setStopSweep] = useState(true);

  useEffect(() => {
    if(currFrequency === 0){
      const {
        primaryComponent,
        secondaryComponent,
        startFrequency,
        stopFrequency,
        acLevel,
        dcBias,
        biasVoltage,
        stepSize
      } = location.state;
      Promise.all([
        pm6306.send_message(`POSITION_FIX ${primaryComponent}`),
        pm6306.send_message(`PARAM ${secondaryComponent}`),
        pm6306.send_message(`AC_LEV ${acLevel}`),
        pm6306.send_message(`DC_BIAS ${dcBias}`),
        pm6306.send_message(`BIAS_VOLTAGE ${biasVoltage}`),
        pm6306.send_message(`FRE ${startFrequency}`),
        pm6306.send_message(`SINGLE`),
      ]).then(()=>{
        setCurrFrequency(startFrequency);
        setStopFrequency(stopFrequency);
        setStepSize(stepSize);
        setStopSweep(false);
      });
    }
  },[location, isActive, currFrequency, stopFrequency, stepSize, stopSweep]);

  useEffect(() => {
    let timerID = null;

    if(isActive && !stopSweep){
      timerID = setInterval(()=>{
        setIsActive(false);
        pm6306.send_message('TRIG;*OPC?').then(result => {
          if(result == Number(1)){
            pm6306.send_message('COMP?').then(result => {
              const regexp = /((\w)\s([0-9-E\.]+)|over)/g;
              const results = [...result.matchAll(regexp)];
              let {primary, secondary} = extract_readings_from_response(result);
              let progress = document.getElementById('animationProgress');
              progress.value = currFrequency / stopFrequency;
              setPrimaryComponentData([
                ...primaryComponentData,
                {
                  x: currFrequency,
                  y: primary.raw,
                  parameter: primary.parameter
                }
              ]);
              setSecondaryComponentData([
                ...secondaryComponentData,
                {
                  x: currFrequency,
                  y: secondary.raw,
                  parameter: secondary.parameter
                }
              ]);
              if(currFrequency + stepSize <= stopFrequency){
                setCurrFrequency(currFrequency+stepSize);
                pm6306.send_message(`FRE ${currFrequency+stepSize}`).then(()=>{
                  setIsActive(true);
                });
              }
              else{
                progress.style.display = "none";
              }
            });
          }
          else{
            console.log("error retrieving result from query");
          }
        });
      }, 100);
    }
    else if(!isActive){
      clearInterval(timerID);
    }
    return () => clearInterval(timerID);

  },[isActive, currFrequency, primaryComponentData, secondaryComponentData, stopSweep]);

  let manuallyStopSweep = ()=>{
    setStopSweep(true);
  }

  return (
  <>
    <div className={`container-fluid ${styles.chart_panel}`}>
      <SweepChart
        primaryComponentData={primaryComponentData}
        secondaryComponentData={secondaryComponentData}
      />
      <progress id="animationProgress" max="1" value="0" className="w-100"></progress>
    </div>
    <footer className={`footer ${styles.footer_nav} w-100`}>
      <div className="container-fluid w-100">
        <div className="d-flex">
            <div>
              <Link to={routes.HOME}>
                <Button className={`float-left ${styles.nav_button}`}  variant="warning">
                  Home
                </Button>
              </Link>
            </div>
            <div className="ml-auto">
              <Button className={`float-right ${styles.nav_button}`} onClick={manuallyStopSweep} variant="danger" disabled={stopSweep || (currFrequency == stopFrequency)}>
                Stop
              </Button>
            </div>
        </div>
      </div>
    </footer>
  </>
  );
}
