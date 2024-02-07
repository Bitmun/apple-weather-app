import { PropType, refactorPropName } from "../../utils/propertiesUtils";
import React, { useEffect, useState } from "react";
import img from "../../assets/png/cloud.sun.fill.png";
import styles from "./propertyTile.module.css";
import { TileProps } from "./types";

export function PropertyTile({ data }: TileProps) {
  const [displayData, setDisplayData] = useState<PropType>();

  useEffect(() => {
    const refactoredData = refactorPropName(data);
    console.log(refactoredData);
    setDisplayData(refactoredData);
  }, []);

  return (
    <div className={styles.tileWrapper}>
      <div className={styles.firstRow}>
        <img className={styles.picture} alt="TileWeatherPicture" src={img} />
        <p className={styles.name}>{displayData?.name}</p>
      </div>
      <p className={styles.value}>{displayData?.value}</p>
      <p className={styles.weatherCode}>Visibility is good</p>
    </div>
  );
}