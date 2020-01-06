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

  const [start_frequency, setStartFrequency] = useState(1000);
  const [stop_frequency, setStopFrequency] = useState(10000);
  const [ac_level, setAcLevel] = useState(1);
  const [dc_bias, setDcBias] = useState(0);

  let callback = ()=>{

  }
  const primary_dropdown_values = []
  for (const [index, value] of primary_options.entries()) {
    primary_dropdown_values.push(<Dropdown.Item className={``} key={shortid.generate()} value={value.command} onClick={callback}> {value.label} </Dropdown.Item>);
  }

  const secondary_dropdown_values = []
  for (const [index, value] of secondary_options.entries()) {
    secondary_dropdown_values.push(<Dropdown.Item className={``} key={shortid.generate()} value={value.command} onClick={callback}> {value.label} </Dropdown.Item>);
  }

  return (
  <>
    <div className={`container-fluid ${styles.paramter_table}`}>
      <div className="row">
        <table className="table table-dark table-sm m-0">
          <tbody>
            <tr>
              <td>
                <Dropdown drop="down" className={`p-0 `}>
                  <Dropdown.Toggle variant="dark" className={`p-0 dropdown`}>
                    TODO Primary
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {primary_dropdown_values}
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
            <tr>
              <td>
                <Dropdown drop="down" className={`p-0 `}>
                  <Dropdown.Toggle variant="dark" className={`p-0 dropdown`}>
                    TODO Secondary
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {secondary_dropdown_values}
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
            <tr>
              <Frequency label="Start Frequency" value={start_frequency} callback={callback}/>
            </tr>
            <tr>
              <Frequency label="Stop Frequency" value={stop_frequency} callback={callback}/>
            </tr>
            <tr>
              <ACLevel value={ac_level} callback={callback}/>
            </tr>
            <tr>
              <DCBias value={dc_bias} callback={callback}/>
            </tr>
            <tr>
              <td><KeypadModal command="FRE" button_label="Step Size" callback={callback} /></td>
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
                  primaryComponent: "C",
                  secondaryComponent: "AUTO",
                  startFrequency: 1000,
                  stopFrequency: 10000,
                  acLevel: "1",
                  dcBias: 0,
                  stepSize: 1000
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
