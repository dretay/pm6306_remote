var convert = require('convert-units')

export default function format_component(parameter, value){
  let converted = 0;
  let units = "---";
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
  }
  let rounded_val = Math.round(converted.val * 1000) / 1000;
  return {
    label: `${rounded_val} ${units}`,
    rounded_val: rounded_val,
    units: units,
    converted: converted
  }
}

export function extract_readings_from_response(response){
  let default_value = '---';
  const regexp = /((\w)\s([0-9-E\.]+)|over)/g;
  const readings = [...response.matchAll(regexp)];
  let retval = {}

  //handle overrange
  if(readings[0][0] === "over"){
    retval['primary'] = format_component(default_value, default_value);
  }else{
    retval['primary'] = format_component(readings[0][2], readings[0][3]);
  }

  if(readings.length > 1){
    if(readings[1][0] === "over"){
      retval['secondary'] = format_component(default_value, default_value);
    }else{
      retval['secondary'] = format_component(readings[1][2], readings[1][3]);
    }
  }
  return retval;
}
