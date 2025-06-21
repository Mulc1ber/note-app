import React from "react";
import { Loader } from "@mantine/core";
import styles from "./Loading.module.css";

export const Loading: React.FC = () => {
  return (
    <div className={styles["loading"]}>
      <Loader size={40} />
      <h3>Загрузка</h3>
    </div>
  );
};
