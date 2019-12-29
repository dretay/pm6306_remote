import React, { useState, useRef } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import * as shortid from 'shortid';

import styles from './DropdownChooser.css';


type Props = {
  values: Array,
  button_label: string,
  callback: () => void
};

export default function DropdownChooser({
  values,
  button_label,
  callback
}: Props) {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);


  const handleClick = event => {
    setShow(!show);
    setTarget(event.target);
  };
  const prepare_callback = e =>{
    let value = e.target.getAttribute("value")
    callback(value);
  }

  const items = []

  for (const [index, value] of values.entries()) {
    items.push(<Dropdown.Item className={`${styles.dropdown_item}`} key={shortid.generate()} value={value.command} onClick={prepare_callback}>{value.label}</Dropdown.Item> );
  }

  return (
     <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic" className={`pt-0 pb-0 ${styles.dropdown_toggle}`}>
        {button_label}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {items}
      </Dropdown.Menu>
    </Dropdown>
  );
}
