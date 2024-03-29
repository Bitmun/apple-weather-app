import React, { useContext, useEffect, useMemo, useState } from "react";
import styles from "./cityCard.module.css";
import { TempBlock } from "../TempBlock/TempBlock";
import { formatTime } from "@utils/dataUtils";
import rainBg from "@assets/mp4/bgRain.mp4";
import cloudyBg from "@assets/mp4/bgClouds.mp4";
import { CityCardProps } from "./types";
import { WeatherData } from "../../api/types";
import { fetchData, getParams } from "../../api/utils";
import { WeatherDataContext } from "../../App";

export function CityCard({ name, latitude, longitude }: CityCardProps) {
  const [data, setData] = useState<WeatherData>();
  const [isLoading, setIsLoading] = useState(true);

  {
    /*Hardcode bg */
  }

  const context = useContext(WeatherDataContext);

  let bgToDisplay = rainBg;

  if (name === "New York") bgToDisplay = cloudyBg;

  useEffect(() => {
    const fetchAllData = async () => {
      const URL = process.env.REACT_APP_URL as string;
      const params = getParams(latitude, longitude, name);
      const res = await fetchData(URL, params);
      setData(res);
      setIsLoading(false);
    };

    fetchAllData();
  }, []);

  const currentData = data?.current;

  const dailyData = data?.daily;

  const currentTime = formatTime(currentData?.time);

  const minTemp = useMemo(
    () => dailyData?.temperature2mMin[0].toFixed(),
    [dailyData],
  );
  const maxTemp = useMemo(
    () => dailyData?.temperature2mMax[0].toFixed(),
    [dailyData],
  );
  const currentTemp = useMemo(
    () => currentData?.temperature2m.toFixed(),
    [currentData],
  );

  const handleCardClick = () => {
    context?.setWeatherData(data);
  };

  return (
    <div className={styles.cardContainer} onClick={handleCardClick}>
      <video className={styles.bgVideo} src={bgToDisplay} autoPlay loop muted />
      <div className={styles.cardWrapper}>
        <div className={styles.leftPartWrapper}>
          {isLoading ? (
            <>
              <p className={styles.cityName}>loading</p>
              <p className={styles.cityTime}>loading</p>
              <p className={styles.weatherCondition}>loading</p>
            </>
          ) : (
            <>
              <p className={styles.cityName}>{name}</p>
              <p className={styles.cityTime}>{currentTime}</p>
              <p className={styles.weatherCondition}>Partly Cloudy</p>
            </>
          )}
        </div>
        <TempBlock
          maxTemp={maxTemp}
          minTemp={minTemp}
          currentTemp={currentTemp}
        />
      </div>
    </div>
  );
}
