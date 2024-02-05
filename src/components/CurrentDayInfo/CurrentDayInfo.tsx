import React, { useContext } from "react";
import { filterHourlyData } from "../../utils/dataUtils";
import "./currentDayInfo.css";
import { WeatherDataContext } from "../../App";

export function CurrentDayInfo() {
  const data = useContext(WeatherDataContext);

  const hourlyData = data?.weatherData.hourly;

  const currentTime = data?.weatherData?.current.time;

  const filteredData = filterHourlyData(hourlyData, currentTime, 10);

  return (
    <div className="hours-wrapper">
      {filteredData.time.map((el, index) => {
        const formattedTime = el.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        return (
          <div key={el.toISOString()} className="hour-wrapper">
            <p>{formattedTime}</p>
            <p>....</p>
            <p>{filteredData.temperature2m[index].toFixed()}</p>
          </div>
        );
      })}
    </div>
  );
}
