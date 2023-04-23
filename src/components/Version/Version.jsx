import React, { memo } from "react";
import Package from "../../../package.json";
import styles from "./Version.module.css";

const Version = () => <div className={styles.version}>v{Package.version}</div>;

export default memo(Version);
