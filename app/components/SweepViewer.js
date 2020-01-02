import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import pm6306 from '../utils/pm6306';
import styles from './SweepPanel.css';

import {exec} from 'child_process';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';

import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';

type Props = {
  location: object
};
export default function SweepPanel({
  location
}: Props) {

  if(location.state !== undefined){
    const {
      primaryComponent,
      secondaryComponent,
      startFrequency,
      stopFrequency,
      acLevel,
      dcBias,
      stepSize
    } = location.state;
  }
  const [data, setData] = useState([
    {x: Date.now(), y: Math.random()},
    {x: Date.now(), y: Math.random()},
    {x: Date.now(), y: Math.random()},
    {x: Date.now(), y: Math.random()},
    {x: Date.now(), y: Math.random()}
  ]);
  // pm6306.send_message(`POSITION_FIX ${primaryComponent}`);
  // pm6306.send_message(`PARAM ${secondaryComponent}`);
  // pm6306.send_message(`AC_LEV ${acLevel}`);
  // pm6306.send_message(`BIAS_VOLTAGE ${dcBias}`);
  const options = {
    responsive: true,
    tooltips: {
      mode: 'label'
    },
    elements: {
      line: {
        fill: false,
        lineTension: 0
      }
    },
    scales: {
      yAxes: [
        {
          tics: { min: 0 }
        }
      ]
    },
    legend: {
      display: true,
      position: 'bottom',
      reverse: true,
      onClick: null
    }
  };
  const Chart = ({ data }) => {
    const config = {
      // labels: labels,
      datasets: [{data: data}]
    };
    return <Line data={config} options={options} />;
  };

  return (
  <>
    <div className={`container-fluid ${styles.paramter_table}`}>
      <Chart data={data} />
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
              <Button className={`float-right ${styles.nav_button}`}  variant="success">
                Start
              </Button>
            </div>
        </div>
      </div>
    </footer>
  </>
  );
}
