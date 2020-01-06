import React, { useState, useRef } from 'react';
import * as shortid from 'shortid';

import Popover from 'react-bootstrap/Popover';
import Overlay from 'react-bootstrap/Overlay';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';
import styles from './LCRReading.css';

import format_component from '../utils/lcrreading'


var convert = require('convert-units')

type Props = {
  options: Array,
  value: string,
  parameter: string,
  variant: string,
  dropdir: string,
  callback: () => void
};



export default function PopoverChooser({
  options,
  value,
  parameter,
  variant,
  dropdir,
  callback
}: Props) {

  const items = []

  for (const [index, value] of options.entries()) {
    items.push(<Dropdown.Item className={`${styles.dropdown_item}`} key={shortid.generate()} value={value.command} onClick={callback}> {value.label} </Dropdown.Item>);
  }


  let {label: formatted_reading} = format_component(parameter, value);
  if(parameter === "p"){
    parameter = "Ø";
  }

  return (
    <>
      <div className={`col-2 p-0`}>
        <Card bg="dark" className={`text-center ${styles.parameter}`}>
          <Card.Header className="p-0 bg-secondary">Parameter</Card.Header>
          <Card.Body className={`p-0 `}>
              <Dropdown drop={dropdir} className={`p-0 `}>
                <Dropdown.Toggle variant="dark" className={`p-0 ${styles.parameter_value} ${variant}`}>
                  {parameter}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {items}
                </Dropdown.Menu>
              </Dropdown>
          </Card.Body>
        </Card>
      </div>
      <div className={`col-10 p-0 text-center ${variant} bg-dark`}>
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
