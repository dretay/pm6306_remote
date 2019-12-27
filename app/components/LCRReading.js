import React, { useState, useRef } from 'react';
import * as shortid from 'shortid';

import Popover from 'react-bootstrap/Popover';
import Overlay from 'react-bootstrap/Overlay';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';
import styles from './LCRReading.css';


var convert = require('convert-units')

type Props = {
  options: Array,
  value: string,
  parameter: string,
  callback: () => void
};

function format_component(parameter, value){
  let converted = null;
  let units = null;
  switch(parameter){
    case "R":
    case "Z":
      converted = convert(Number(value)).from('Ohm').toBest();
      units = converted.singular;
      break;
    case "L":
      converted = convert(Number(value)).from('H').toBest({reverse:true, maxNumber: 1000});
      units = converted.unit;
      break;
    case "C":
      converted = convert(Number(value)).from('farad').toBest({reverse:true, maxNumber: 1000});
      units = converted.unit;
      break;
    case "Q":
      converted = {val:value};
      units = "";
    case "D":
      converted = {val:value};
      units = "";
      break;
    case "p":
      converted = {val:value};
      units = "deg";
      break;
    default:
      return '---'
  }
  let rounded_val = Math.round(converted.val * 1000) / 1000;
  return `${rounded_val} ${units}`;
}

export default function PopoverChooser({
  options,
  value,
  parameter,
  callback
}: Props) {

  const items = []

  for (const [index, value] of options.entries()) {
    items.push(<Dropdown.Item key={shortid.generate()} value={value.command} onClick={callback}> {value.label} </Dropdown.Item>);
  }


  let formatted_reading = format_component(parameter, value);
  if(parameter === "p"){
    parameter = "Ø";
  }

  return (
    <>
      <div className={`col-2 p-0`}>
        <Card bg="dark" className={`text-center ${styles.parameter}`}>
          <Card.Header className="p-0 bg-secondary">Parameter</Card.Header>
          <Card.Body className={`p-0 `}>
              <Dropdown drop="right">
                <Dropdown.Toggle variant="dark" className={`p-0 ${styles.parameter_value}`}>
                  {parameter}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {items}
                </Dropdown.Menu>
              </Dropdown>
          </Card.Body>
        </Card>
      </div>
      <div className={`col-10 p-0 text-center text-success bg-dark`}>
        <Card bg="dark" className={`text-center ${styles.parameter}`}>
            <Card.Header className="p-0 bg-secondary">&nbsp;</Card.Header>
            <Card.Body className={`p-0`}>
              <div className={`p-0 ${styles.value} align-middle`}>{formatted_reading}</div>
            </Card.Body>
          </Card>
      </div>
    </>
  );
}
