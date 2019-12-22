// @flow
import type { GetState, Dispatch } from '../reducers/types';

// import {init,send_message} from "../utils/pm6306";

export function fetch_lcr_readings() {
  return (dispatch: Dispatch) => {
      dispatch({type: "update"});

      // send_message("component?").then((result)=>{
      //   console.log(result);
      //   dispatch({type: "update"});
      // });
  };
}
