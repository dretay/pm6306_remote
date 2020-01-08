import React, { useState, useRef } from 'react';
let convert = require('convert-units');
import KeypadModal from '../KeypadModal';
import * as _ from 'underscore';

type Props = {
  value: string,
  callback: () => void
};

function format_bias_voltage(dc_bias) {
  let dc_bias_val = 0;
  if(dc_bias!== undefined){
    if(_.isNumber(dc_bias)){
      dc_bias_val = dc_bias;
    }
    else if(_.isString(dc_bias)){
      dc_bias_val = dc_bias.split(' ')[1];
    }
    let converted_dc_bias = convert(dc_bias_val)
      .from('V')
      .toBest();
    return `${converted_dc_bias.val} ${converted_dc_bias.unit}`;
  }
  return "";
}

export default function BiasVoltage({
  value,
  callback
}: Props) {
  let formatted_value = format_bias_voltage(value);
  return (
    <>
      <td className="text-center table-dark">
        <strong>Bias Voltage</strong>
      </td>
      <td className="text-center table-active">
        <KeypadModal command="BIAS_VOLTAGE" button_label={formatted_value} callback={callback} />
      </td>
    </>
  );
}
