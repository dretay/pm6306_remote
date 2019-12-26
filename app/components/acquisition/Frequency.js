import React, { useState, useRef } from 'react';
let convert = require('convert-units');
import KeypadModal from '../KeypadModal';

type Props = {
  value: string,
  callback: () => void
};

function format_frequency(frequency) {
  if(frequency !== undefined){
    let frequency_val = frequency.split(' ')[1];
    let converted_frequency = convert(frequency_val)
      .from('Hz')
      .toBest();
    if(isNaN(converted_frequency.val)){
      return frequency;
    }
    return `${converted_frequency.val} ${converted_frequency.unit}`;
  }
  return "";
}

export default function Frequency({
  value,
  callback
}: Props) {
  let formatted_value = format_frequency(value);
  return (
    <>
      <td className="text-center table-dark">
        <strong>Frequency</strong>
      </td>
      <td className="text-center table-active">
        <KeypadModal command="FRE" button_label={formatted_value} callback={callback} />
      </td>
    </>
  );
}
