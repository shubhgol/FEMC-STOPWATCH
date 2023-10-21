import { useEffect, useRef, useState } from "react";
import "./styles.css";

export default function App() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isTimerStart, setIsTimerStart] = useState(false);
  const startTime = useRef(null);

  const hoursInMs = hours * 60 * 60 * 1000;
  const minutesInMs = minutes * 60 * 1000;
  const secondsInMs = seconds * 1000;

  const totalTimeInMs = hoursInMs + minutesInMs + secondsInMs;

  useEffect(() => {
    let timerId;
    if (isTimerStart) {
      // const currentTimeInMs = new Date().getTime();
      timerId = setInterval(() => {
        const endTimeInMs = startTime.current + totalTimeInMs;
        const leftTimeInMs = endTimeInMs - new Date().getTime();
        if (leftTimeInMs > 0) {
          const hh = Math.floor(
            (leftTimeInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const mm = Math.floor(
            (leftTimeInMs % (1000 * 60 * 60)) / (1000 * 60)
          );
          const ss = Math.floor((leftTimeInMs % (1000 * 60)) / 1000);
          setHours(hh);
          setMinutes(mm);
          setSeconds(ss);
        } else {
          setHours(0);
          setMinutes(0);
          setSeconds(0);
          setIsTimerStart(false);
          startTime.current = 0;
        }
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [isTimerStart]);

  const onChangeHandler = (value, type) => {
    switch (type) {
      case "hours":
        setHours(value);
        break;
      case "minutes":
        setMinutes(value);
        break;
      case "seconds":
        setSeconds(value);
        break;
      default:
        return;
    }
  };

  return (
    <div className="App">
      <label>Hours:</label> &nbsp;
      <input
        type="text"
        value={hours}
        onChange={(e) => {
          onChangeHandler(e.target.value, "hours");
        }}
      />{" "}
      <br />
      <br />
      <label>Minutes:</label> &nbsp;
      <input
        type="text"
        value={minutes}
        onChange={(e) => {
          onChangeHandler(e.target.value, "minutes");
        }}
      />
      <br />
      <br />
      <label>Seconds:</label> &nbsp;
      <input
        type="text"
        value={seconds}
        onChange={(e) => {
          onChangeHandler(e.target.value, "seconds");
        }}
      />
      <br />
      <br />
      <h2>
        {hours <= 9 ? `0${hours}` : hours}:
        {minutes <= 9 ? `0${minutes}` : minutes}:
        {seconds <= 9 ? `0${seconds}` : seconds}
      </h2>
      <button
        style={{ cursor: "pointer" }}
        onClick={() => {
          startTime.current = new Date().getTime();
          setIsTimerStart(true);
        }}
      >
        Start Timer
      </button>
    </div>
  );
}
