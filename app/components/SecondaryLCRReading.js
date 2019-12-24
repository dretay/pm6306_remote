// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './LCRReading.css';
import {format_component} from '../utils/lcrreading'
import pm6306 from "../utils/pm6306";

type Props = {
  parameter: string,
  value: string
};

export default class SecondaryLCRReading extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
  }

  state = {
    isOpen: false
  };

  toggle_open = () => this.setState({ isOpen: !this.state.isOpen });

  set_reading(value){
    pm6306.send_message(value);
    this.toggle_open();
  }

  render() {

    const {parameter} = this.props;
    const {val: value, label:units} = format_component(parameter, this.props.value);

    const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;

    return (
      <tr>
        <th scope="row" className={`p-0 ${styles.parameter}`}>
          <div className={`card bg-secondary text-center`}>
            <div className="card-header p-0">Parameter</div>
            <div className={`card-body p-0 ${styles.parameter_value}`} >
              <div className="btn-group dropup">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={this.toggle_open}>
                  <span className={`${styles.parameter_value}`}> {parameter} </span>
                </button>
                <div className={menuClass}>
                  <a className="dropdown-item" onClick={((e) => this.set_reading("PARAM QUALITY"))}>Quality</a>
                  <a className="dropdown-item" onClick={((e) => this.set_reading("PARAM DISSIPATION"))}>Dissipation</a>
                  <a className="dropdown-item" onClick={((e) => this.set_reading("PARAM PHASE"))}>Phase</a>
                  <a className="dropdown-item" onClick={((e) => this.set_reading("PARAM IMPEDANCE"))}>Impedance</a>
                  <a className="dropdown-item" onClick={((e) => this.set_reading("PARAM VOLTAGE"))}>Voltage</a>
                  <a className="dropdown-item" onClick={((e) => this.set_reading("PARAM CURRENT"))}>Current</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" onClick={((e) => this.set_reading("PARAM AUTO"))}>Auto</a>
                </div>
              </div>
            </div>
          </div>
        </th>
        <td className={`text-center text-info ${styles.value}`}>
          {value}{units}
        </td>
      </tr>
    );
  }
}
