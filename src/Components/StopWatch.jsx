import React, { useEffect, useRef, useState } from "react";

const StopWatch = ({ id, activeTimerId, setActiveTimerId}) => {
  const getData = JSON.parse(localStorage.getItem("tasks"))||[];
  console.log(getData, "getData");
  console.log(id, "id-->");

  // const [startTime, setStartTime] = useState(false);
  const [now, setNow] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  const isActive = activeTimerId === id;

  useEffect(() => {
    if (isActive) {
      intervalIdRef.current = setInterval(() => {
        setNow(Date.now() - startTimeRef.current);
      }, 10);
    }
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isActive]);

  function start() {
    setNow(0);
    startTimeRef.current = Date.now(); 
    setActiveTimerId(id); 
  //   const res = getData.find((item) => item.id === id);
  //   console.log(res, "res");
  //  if(res.id){
  //   setStartTime(true);
  //   startTimeRef.current = Date.now() - now;
  //  }
    // console.log(startTimeRef.current,'start')
  }

  function stop() {
    // setStartTime(false);
    if (isActive) {
      setActiveTimerId(null); // Stop the current timer
    }
  }

  function reset() {
    // setNow(0);
    // setStartTime(false);
    if (!isActive) {
      setNow(0);
    }
  }

  function formatTime() {
    let hours = Math.floor(now / (1000 * 60 * 60));
    let minutes = Math.floor((now / (1000 * 60)) % 60);
    let seconds = Math.floor((now / 1000) % 60);
    let milliSeconds = Math.floor((now % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliSeconds = String(milliSeconds).padStart(2, "0");

    return `${hours}:${minutes}:${seconds} `;
  }

  return (
    <div className="flex  justify-between items-center ml-6 w-[260px]   rounded-lg  ">
      <div className="w-[150px] h-8   border text-center rounded-md font-semibold text-xl">
        {formatTime()}
      </div>
      <div className="flex gap-2">
      {isActive ? (
          <button
            onClick={stop}
            className="border w-20 rounded-md ml-4 text-xl text-white bg-red-700"
          >
            Stop
          </button>
        ) : (
          <button
            onClick={start}
            className="border w-20 rounded-md text-xl text-white bg-green-800"
          >
            Start
          </button>
        )}

        {/* <button
          onClick={reset}
          className="border w-20 rounded-md text-xl text-white bg-blue-700"
        >
          Reset
        </button> */}
      </div>
    </div>
  );
};

export default StopWatch;
