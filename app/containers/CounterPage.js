import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import * as CounterActions from '../actions/counter';

function mapStateToProps(state) {
  return {
    primary_reading_units: state.primary_reading_units,
    primary_reading_value: state.primary_reading_value,
    secondary_reading_units: state.secondary_reading_units,
    secondary_reading_value: state.secondary_reading_value
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
