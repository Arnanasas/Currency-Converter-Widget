import React, { FC } from "react";
import styles from "./styles/InputLabel.module.scss";

interface InputLabelProps {
  label: string;
}

const InputLabel: FC<InputLabelProps> = ({ label }) => {
  return <label className={styles.formLabel}>{label}</label>;
};

export default InputLabel;
