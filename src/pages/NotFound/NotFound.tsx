import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export const NotFound: React.FC = () => {
  return (
    <div className={styles["not-found"]}>
      <h1>Not Found</h1>
      <Link to="/">Вернуться на главную страницу</Link>
    </div>
  );
};
