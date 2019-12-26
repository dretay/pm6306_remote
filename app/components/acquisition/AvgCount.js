import React, { useState, useRef } from 'react';
let convert = require('convert-units');
import DropdownChooser from '../DropdownChooser';
import average_choices from '../../constants/average.json';

type Props = {
  value: string,
  callback: () => void
};

function format_average(average) {
  if(average !== undefined){
    let average_val = Number(average.split(' ')[1]);
    let formatted_fixture = 'UNKNOWN';
    switch (average_val) {
      case 0:
        formatted_fixture = 'OFF';
        break;
      case 1:
        formatted_fixture = 'LOW';
        break;
      case 2:
        formatted_fixture = 'MEDIUM';
        break;
      case 3:
        formatted_fixture = 'HIGH';
        break;
      default:
        formatted_fixture = 'UNKNOWN';
    }
    return formatted_fixture;
  }
  return "";
}

export default function AvgCount({
  value,
  callback
}: Props) {
  let formatted_value = format_average(value);
  return (
    <>
      <td className="text-center table-dark">
        <strong>Average</strong>
      </td>
      <td className="text-center table-active">
        <DropdownChooser command="AVERAGE" button_label={formatted_value} values={average_choices} callback={callback} />
      </td>
    </>
  );
}
