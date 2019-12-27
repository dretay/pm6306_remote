import React, { useState, useRef } from 'react';
import * as shortid from 'shortid';
import Popover from 'react-bootstrap/Popover';
import Overlay from 'react-bootstrap/Overlay';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import styles from './PopoverChooser.css';

type Props = {
  values: Array,
  button_label: string,
  callback: () => void
};

export default function PopoverChooser({
  values,
  button_label,
  callback
}: Props) {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = event => {
    setShow(!show);
    setTarget(event.target);
  };
  const prepare_callback = e =>{
    let value = e.target.getAttribute("value")
    callback(value);
    setShow(!show);
  }

  const items = []

  for (const [index, value] of values.entries()) {
    items.push(<Button key={shortid.generate()} variant={value.variant} value={value.command} className={`btn`} onClick={prepare_callback}> {value.label} </Button>);
  }

  return (
    <ButtonToolbar cref={ref}>
      <Button
        variant="secondary"
        className={`${styles.button} pt-0 pb-0 text-center`}
        onClick={handleClick}
      >
        {button_label}
      </Button>
      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref.current}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Content>
            <ButtonGroup>
              {items}
            </ButtonGroup>
          </Popover.Content>
        </Popover>
      </Overlay>
    </ButtonToolbar>
  );
}
