import React from 'react';
import { Line, Scatter } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';
import get_colors from '../utils/bootstrap_colors';
const convert = require('convert-units');
import * as _ from 'underscore';
import format_component from '../utils/lcrreading'

let primary_parameter = null;
let secondary_parameter = null;

type Props = {
  primaryComponentData: Array,
  secondaryComponentData: Array,
};
export default function SweepChart({
  primaryComponentData,
  secondaryComponentData,
}: Props) {
  const theme = get_colors();

  const options = {
    responsive: true,
    hoverMode: 'nearest',
    elements: {
      line: {
        fill: false,
        lineTension: 0
      }
    },
    tooltips: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      titleFontColor: '#000',
      bodyFontColor: '#000'
    },
    scales: {
      xAxes: [{
        position: 'bottom',
        gridLines: {
          color: 'rgba(255, 255, 255, 0.2)',
          zeroLineColor: 'rgba(255, 255, 255, 0.5)'
        },
        ticks: {
          fontColor: "white",
          fontSize: 18,
          callback: (value, index, values)=> {
            let converted_frequency = convert(value).from('Hz').toBest();
            return `${converted_frequency.val} ${converted_frequency.unit}`
          }
        },
      }],
      yAxes: [{
        scaleLabel: {
          display: false,
        },
        position: 'left',
        id: 'primary-component',
        gridLines: {
          color: 'rgba(255, 255, 255, 0.2)',
          zeroLineColor: 'rgba(255, 255, 255, 0.5)'
        },
        ticks: {
          fontColor: theme.success,
          fontSize: 18,
          callback: (value, index, values)=> {
            if(_.isArray(primaryComponentData) && primaryComponentData.hasOwnProperty(index)){
              primary_parameter = primaryComponentData[index].parameter;
            }
            if(!_.isNull(primary_parameter)){
              return format_component(primary_parameter,value).label;
            }
            return value;
          }
        }
      },
      {
        scaleLabel: {
          display: false,
        },
        position: 'right',
        id: 'secondary-component',
        gridLines: {
          color: 'rgba(255, 255, 255, 0.2)',
          zeroLineColor: 'rgba(255, 255, 255, 0.5)'
        },
        ticks: {
          fontColor: theme.info,
          fontSize: 18,
          callback: (value, index, values)=> {
            if(_.isArray(secondaryComponentData) && secondaryComponentData.hasOwnProperty(index)){
              secondary_parameter = secondaryComponentData[index].parameter;
            }
            if(!_.isNull(secondary_parameter)){
              return format_component(secondary_parameter,value).label;
            }
            return value;
          }
        }
      }],
    },
    aspectRatio: 1.75,
    legend: {
      display: false,
    },
    animation: false

  };
  const plugins  = {

  };

  const config = {
    // labels: labels,
    datasets: [
      {
        borderColor: theme.success,
        backgroundColor: theme.success,
        data: primaryComponentData,
        showLine: true,
        yAxisID: 'primary-component',
        label: 'primary-component',
      },
      {
        borderColor: theme.info,
        backgroundColor: theme.info,
        data: secondaryComponentData,
        showLine: true,
        yAxisID: 'secondary-component',
        label: 'secondary-component',
      }
    ],
    options: options,
    plugins: plugins
  };
  return (<Scatter data={config} options={options} />);
};
