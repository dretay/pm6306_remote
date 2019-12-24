var convert = require('convert-units')

export function format_component(component, value){
  let converted = null;
  let rounded_val = null;

  switch(component){
    case "R":
      converted = convert(Number(value)).from('Ohm').toBest()
      rounded_val = converted.val.toFixed(3);
      return {val: rounded_val, label: converted.singular}
    case "L":
      converted = convert(Number(value)).from('H').toBest({reverse:true, maxNumber: 1000})
      rounded_val = converted.val.toFixed(3);
      return {val: rounded_val, label: converted.unit}
    case "C":
      converted = convert(Number(value)).from('farad').toBest({reverse:true, maxNumber: 1000})
      rounded_val = converted.val.toFixed(3);
      return {val: rounded_val, label: converted.unit}
   default:
    return {val: value, label: component};
  }
}
