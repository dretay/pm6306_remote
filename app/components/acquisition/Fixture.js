import React, { useState, useRef } from 'react';
let convert = require('convert-units');
import DropdownChooser from '../DropdownChooser';
import fixture_choices from '../../constants/fixtures.json';

type Props = {
  value: string,
  callback: () => void
};

function format_fixture(fixture) {
  if(fixture !== undefined){
    fixture = Number(fixture.split(' ')[1]);
    let formatted_fixture = 'UNKNOWN';
    switch (fixture) {
      case 0:
        formatted_fixture = '<50 pF';
        break;
      case 1:
        formatted_fixture = '50-150 pF';
        break;
      case 2:
        formatted_fixture = '150-250 pF';
        break;
      case 3:
        formatted_fixture = '250-350 pF';
        break;
      case 4:
        formatted_fixture = '350-450 pF';
        break;
      case 5:
        formatted_fixture = '450-550 pF';
        break;
      case 6:
        formatted_fixture = '550-650 pF';
        break;
      case 7:
        formatted_fixture = '650-750 pF';
        break;
      case 8:
        formatted_fixture = '750-850 pF';
        break;
      case 9:
        formatted_fixture = '850-890 pF';
        break;
      case 10:
        formatted_fixture = '950-1050 pF';
        break;
      default:
        formatted_fixture = 'UNKNOWN';
    }
    return formatted_fixture;
  }
  return "";
}

export default function Fixture({
  value,
  callback
}: Props) {
  let formatted_value = format_fixture(value);
  return (
    <>
      <td className="text-center table-dark">
        <strong>Fixture</strong>
      </td>
      <td className="text-center table-active">
        <DropdownChooser button_label={formatted_value} values={fixture_choices} callback={callback} />
      </td>
    </>
  );
}
