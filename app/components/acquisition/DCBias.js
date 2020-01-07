import React, { useState, useRef } from 'react';
let convert = require('convert-units');
import PopoverChooser from '../PopoverChooser';
import dc_bias_choices from '../../constants/dc_bias.json';
import * as _ from 'underscore';

type Props = {
  value: string,
  callback: () => void
};

function format_dc_bias(dc_bias) {
  if(dc_bias !== undefined){
    if(_.isString(dc_bias)){
      if(dc_bias.includes("DC_BIAS")){
        return dc_bias.split(' ')[1];
      }
    }
    return dc_bias;
  }
  return "";
}

export default function DCBias({
  value,
  callback
}: Props) {
  let formatted_value = format_dc_bias(value);
  return (
    <>
      <td className="text-center table-dark">
        <strong>DC Bias</strong>
      </td>
      <td className="text-center table-active">
        <PopoverChooser values={dc_bias_choices} button_label={formatted_value} callback={callback} />
      </td>
    </>
  );
}
