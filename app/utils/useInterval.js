//from https://overreacted.io/making-setinterval-declarative-with-react-hooks/
import React, { useEffect, useRef } from "react";
import * as _ from 'underscore';

export default function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    let id = null;
    let canceled = false;
    function tick() {
      clearInterval(id);
      if(!canceled){
        let retVal = savedCallback.current();
        if(!_.isUndefined(retVal) && typeof retVal.then == 'function'){
          retVal.then(()=>{
            if(!canceled){
              id = setInterval(tick, delay);
            }
          });
        }
        else{
          if(!canceled){
            id = setInterval(tick, delay);
          }
        }
      }
    }
    if (delay !== null) {
      id = setInterval(tick, delay);
      return () => {
        canceled = true;
        clearInterval(id);
      }
    }
  }, [delay]);
}
