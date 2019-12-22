// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './LCRReading.css';
import routes from '../constants/routes.json';
var convert = require('convert-units')
import pm6306 from "../utils/pm6306";

type Props = {

};

export default class Parameters extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    let default_value = "---";
    this.state = {
      primary_parameter: default_value,
      primary_value: default_value,
      primary_units: default_value,
      secondary_parameter: default_value,
      secondary_value: default_value,
      secondary_units: default_value
    }
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  format_component(component, value){
    let converted = null;
    let rounded_val = null;

    switch(component){
      case "R":
        converted = convert(Number(value)).from('Ohm').toBest()
        rounded_val = converted.val.toFixed(3);
        return {val: rounded_val, label: converted.singular}
      case "L":
        converted = convert(Number(value)).from('H').toBest({reverse:true, maxNumber: 1000})
        rounded_val = converted.val.toFixed(3);
        return {val: rounded_val, label: converted.unit}
      case "C":
        converted = convert(Number(value)).from('farad').toBest({reverse:true, maxNumber: 1000})
        rounded_val = converted.val.toFixed(3);
        return {val: rounded_val, label: converted.unit}
     default:
      return {val: value, label: component};
    }
  }

  tick() {
    pm6306.send_message("component?").then((result)=>{
      let [,primary_parameter, raw_primary_value, secondary_parameter, raw_secondary_value] = result.match(/^(\w)\s(.+);(\w)\s(.+)$/);
      let primary_value = this.format_component(primary_parameter, raw_primary_value);
      let secondary_value = this.format_component(secondary_parameter, raw_secondary_value);
      this.setState({
        primary_parameter: primary_parameter,
        primary_value: primary_value.val,
        primary_units: primary_value.label,

        secondary_parameter: secondary_parameter,
        secondary_value: secondary_value.val,
        secondary_units: secondary_value.label
      });
    });
  }

  render() {

    const {
    } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-12 p-0">
            <table className="table table-dark">
              <tbody>
                <tr>
                  <th scope="row" className={`p-0 ${styles.parameter}`}>
                    <div className={`card bg-secondary text-center`}>
                      <div className="card-header p-0">Parameter</div>
                      <div className={`card-body p-0 ${styles.parameter_value}`} >
                        {this.state.primary_parameter}
                      </div>
                    </div>
                  </th>
                  <td className={`text-center text-success ${styles.value}`}>
                    {this.state.primary_value}{this.state.primary_units}
                  </td>
                </tr>
                <tr>
                  <th scope="row" className={`p-0 ${styles.parameter}`}>
                    <div className={`card bg-secondary text-center`}>
                      <div className="card-header p-0">Parameter</div>
                      <div className={`card-body p-0 ${styles.parameter_value}`} >
                        {this.state.secondary_parameter}
                      </div>
                    </div>
                  </th>
                  <td className={`text-center text-info ${styles.value}`}>
                    {this.state.secondary_value}{this.state.secondary_units}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
