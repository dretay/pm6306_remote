import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SweepPanel from '../components/SweepPanel';
import * as SweepPanelActions from '../actions/sweeppanel';

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SweepPanelActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SweepPanel);

// import React, { Component } from 'react';
// import Home from '../components/FrontPanel';

// type Props = {};

// export default class HomePage extends Component<Props> {
//   props: Props;

//   render() {
//     return <FrontPanel />;
//   }
// }

