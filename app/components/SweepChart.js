import React from 'react';
import { Line, Scatter } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';
import get_colors from '../utils/bootstrap_colors';
const convert = require('convert-units');


type Props = {
  primaryComponentData: Array,
  primaryComponentLabel: string,
  secondaryComponentData: Array,
  secondaryComponentLabel: string
};
export default function SweepChart({
  primaryComponentData,
  primaryComponentLabel,
  secondaryComponentData,
  secondaryComponentLabel
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
          labelString: primaryComponentLabel,
          display: true,
          fontSize: 18,
          fontColor: theme.success,
          fontStyle: "bold"
        },
        position: 'left',
        id: 'primary-component',
        gridLines: {
          color: 'rgba(255, 255, 255, 0.2)',
          zeroLineColor: 'rgba(255, 255, 255, 0.5)'
        },
        ticks: {
          fontColor: "white",
          fontSize: 18
        }
      },
      {
        scaleLabel: {
          labelString: secondaryComponentLabel,
          display: true,
          fontSize: 18,
          fontColor: theme.info,
          fontStyle: "bold"
        },
        position: 'right',
        id: 'secondary-component',
        gridLines: {
          color: 'rgba(255, 255, 255, 0.2)',
          zeroLineColor: 'rgba(255, 255, 255, 0.5)'
        },
        ticks: {
          fontColor: "white",
          fontSize: 18
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
        label: "Capacitance",
        data: primaryComponentData,
        showLine: true,
        yAxisID: 'primary-component',
      },
      {
        borderColor: theme.info,
        backgroundColor: theme.info,
        label: "Resistance",
        data: secondaryComponentData,
        showLine: true,
        yAxisID: 'secondary-component',
      }
    ],
    options: options,
    plugins: plugins
  };
  return (<Scatter data={config} options={options} />);
};
