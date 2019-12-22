import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FrontPanel from '../components/FrontPanel';
import * as FrontPanelActions from '../actions/frontpanel';

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FrontPanelActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontPanel);

// import React, { Component } from 'react';
// import Home from '../components/FrontPanel';

// type Props = {};

// export default class HomePage extends Component<Props> {
//   props: Props;

//   render() {
//     return <FrontPanel />;
//   }
// }

