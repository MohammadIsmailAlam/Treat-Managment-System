import React, { useState, useEffect } from "react";

export default function Status(props) {
  const { creationTime, timeLimit } = props;
  const [isRunning, setIsRunning] = useState(true);
  const [lastCreatedTreat, setLastCreatedTreat] = useState("");
  const [running, setRunning] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://treat-management-system-691e2-default-rtdb.firebaseio.com/treats.json")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = Object.entries(data)
          .filter(
            ([key, treat]) =>
              treat.userEmail === localStorage.getItem("userEmail")
          )
          .map(([key, treat]) => [key, treat]);
        setData(Object.fromEntries(filteredData));
      });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime > creationTime + timeLimit) {
        setIsRunning(false);
        clearInterval(intervalId);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [creationTime, timeLimit]);

  useEffect(() => {
    const lastTreat = Object.values(data).pop();
    if (lastTreat) {
      setLastCreatedTreat(lastTreat.caption);
    }
  }, [data]);

  return (
    <div>
        <p>Last created treat: {lastCreatedTreat}</p>
    </div>
  );
}
