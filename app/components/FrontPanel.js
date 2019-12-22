// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './FrontPanel.css';
import routes from '../constants/routes.json';
import LCRReading from './LCRReading'
import LCRInformation from './LCRInformation'


type Props = {

};

export default class FrontPanel extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
  }

  render() {

    const {
    } = this.props;

    return (
      <div>
        <LCRInformation/>
        <LCRReading/>
      </div>
    );
  }
}
