import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SweepViewer from '../components/SweepViewer';
import * as SweepViewerActions from '../actions/sweepviewer';

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SweepViewerActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SweepViewer);

// import React, { Component } from 'react';
// import Home from '../components/FrontPanel';

// type Props = {};

// export default class HomePage extends Component<Props> {
//   props: Props;

//   render() {
//     return <FrontPanel />;
//   }
// }

