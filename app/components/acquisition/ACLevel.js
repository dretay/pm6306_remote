import React, { useState, useRef } from 'react';
let convert = require('convert-units');
import KeypadModal from '../KeypadModal';

type Props = {
  value: string,
  callback: () => void
};

function format_ac_level(ac_level) {
  if(ac_level !== undefined){
    let ac_level_val = ac_level.split(' ')[1];
    let converted_ac_level = convert(ac_level_val)
      .from('V')
      .toBest();
    return `${converted_ac_level.val} ${converted_ac_level.unit}`;
  }
  return "";
}

export default function ACLevel({
  value,
  callback
}: Props) {
  let formatted_value = format_ac_level(value);
  return (
    <>
      <td className="text-center table-dark">
        <strong>AC Level</strong>
      </td>
      <td className="text-center table-active">
        <KeypadModal command="AC_LEV" button_label={formatted_value} callback={callback} />
      </td>
    </>
  );
}
