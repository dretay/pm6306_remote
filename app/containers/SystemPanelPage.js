import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SystemPanel from '../components/SystemPanel';
import * as SystemPanelActions from '../actions/systempanel';

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SystemPanelActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemPanel);

// import React, { Component } from 'react';
// import Home from '../components/FrontPanel';

// type Props = {};

// export default class HomePage extends Component<Props> {
//   props: Props;

//   render() {
//     return <FrontPanel />;
//   }
// }

