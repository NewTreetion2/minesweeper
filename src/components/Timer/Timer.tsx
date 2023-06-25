import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "store/store";
import { increaseTime } from "store/timeSlice";

const Timer = React.memo(() => {
  const dispatch = useDispatch();
  const { time, isRunning } = useSelector(
    (state: RootState) => state.time,
    (prev, next) => prev.time === next.time && prev.isRunning === next.isRunning
  );

  let intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = null;
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        dispatch(increaseTime());
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, dispatch]);

  return <div>Timer : {time}</div>;
});

export default Timer;
