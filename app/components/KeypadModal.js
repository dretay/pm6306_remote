import React, { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import styles from './KeypadModal.css';

type Props = {
  command: string,
  button_label: string,
  callback: () => void
};

export default function KeypadModal({ command, button_label, callback }: Props) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('');

  const handle_close = () => {
    setShow(false);
  }
  const handle_enter = () => {
    callback(`${command} ${value}`);
    setShow(false);
  };
  const handle_show = () => {
    setValue("");
    setShow(true);
  }

  const handle_number_click = e => {
    setValue(value + e.target.value);
  };
  const handle_scale_click = e => {
    const scale = e.target.value;
    let parsed_value = Number(value);
    let scaled_value = parsed_value * scale;
    setValue(scaled_value.toString());
  };
  const handle_back_click = e => {
    setValue(value.slice(0, -1));
  };
  const handle_clear_click = e => {
    setValue('');
  };
  const handle_decimal_click = e => {
    if (!value.includes('.')) {
      setValue(value + '.');
    }
  };
  const handle_sign_click = e => {
    if (value[0] === '-') {
      setValue(value.substr(1));
    } else {
      setValue('-' + value);
    }
  };

  return (
    <>
      <Button variant="secondary" className={`${styles.keypad_root_button} pt-0 pb-0 text-center`} onClick={handle_show}>
        {button_label}
      </Button>
      <Modal show={show} onHide={handle_close}  size="lg">
        <Modal.Body >
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div
                  className={`btn-group-vertical ml-4 mt-4 ${styles.keypad_panel}`}
                  role="group"
                >
                  <div className="btn-group">
                    <input className={`text-center form-control-lg mb-2 ${styles.input_text}`} value={value} readOnly />
                  </div>
                  <ButtonGroup>
                    <Button
                      variant="light"
                      value="7"
                      onClick={handle_number_click}
                      className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}
                    >
                      7
                    </Button>
                    <Button
                      variant="light"
                      value="8"
                      onClick={handle_number_click}
                      className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}
                    >
                      8
                    </Button>
                    <Button
                      variant="light"
                      value="9"
                      onClick={handle_number_click}
                      className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}
                    >
                      9
                    </Button>
                    <Button
                      variant="light"
                      value="1000"
                      onClick={handle_scale_click}
                      className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}
                    >
                      k
                    </Button>
                    <Button
                      variant="light"
                      value="0.001"
                      onClick={handle_scale_click}
                      className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}
                    >
                      m
                    </Button>
                    <Button
                      variant="light"
                      onClick={handle_enter}
                      className={`btn btn-outline-secondary py-3 ${styles.wide_keypad_button}`}
                    >
                      Enter
                    </Button>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Button
                      variant="light"
                      value="4"
                      onClick={handle_number_click}
                      className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}
                    >
                      4
                    </Button>
                    <Button
                      variant="light"
                      value="5"
                      onClick={handle_number_click}
                      className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}
                    >
                      5
                    </Button>
                    <Button
                      variant="light"
                      value="6"
                      onClick={handle_number_click}
                      className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}
                    >
                      6
                    </Button>
                    <Button
                      variant="light"
                      value="1000000"
                      onClick={handle_scale_click}
                      className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}
                    >
                      M
                    </Button>
                    <Button
                      variant="light"
                      value="0.000001"
                      onClick={handle_scale_click}
                      className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}
                    >
                      µ
                    </Button>
                    <Button
                      variant="light"
                      onClick={handle_back_click}
                      className={`btn btn-outline-secondary py-3 ${styles.wide_keypad_button}`}
                    >
                      Back
                    </Button>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Button
                      variant="light"
                      value="1"
                      onClick={handle_number_click}
                      className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}
                    >
                      1
                    </Button>
                    <Button
                      variant="light"
                      value="2"
                      onClick={handle_number_click}
                      className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}
                    >
                      2
                    </Button>
                    <Button
                      variant="light"
                      value="3"
                      onClick={handle_number_click}
                      className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}
                    >
                      3
                    </Button>
                    <Button
                      variant="light"
                      value="1000000000"
                      onClick={handle_scale_click}
                      className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}
                    >
                      G
                    </Button>
                    <Button
                      variant="light"
                      value="0.000000001"
                      onClick={handle_scale_click}
                      className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}
                    >
                      n
                    </Button>
                    <Button
                      variant="light"
                      onClick={handle_clear_click}
                      className={`btn btn-outline-secondary py-3 ${styles.wide_keypad_button}`}
                    >
                      Clear
                    </Button>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Button
                      variant="light"
                      value="0"
                      onClick={handle_number_click}
                      className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}
                    >
                      0
                    </Button>
                    <Button
                      variant="light"
                      onClick={handle_decimal_click}
                      className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}
                    >
                      .
                    </Button>
                    <Button
                      variant="light"
                      onClick={handle_sign_click}
                      className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}
                    >
                      ±
                    </Button>
                    <Button
                      variant="light"
                      value="000"
                      onClick={handle_number_click}
                      className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}
                    >
                      000
                    </Button>
                    <Button
                      variant="light"
                      value="0.000000000001"
                      onClick={handle_scale_click}
                      className={`btn btn-outline-secondary py-3 ${styles.keypad_button}`}
                    >
                      p
                    </Button>
                    <Button
                      variant="light"
                      onClick={handle_close}
                      className={`btn btn-outline-secondary py-3 ml-10 ${styles.wide_keypad_button}`}
                    >
                      Exit
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
