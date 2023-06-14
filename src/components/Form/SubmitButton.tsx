import React, { FC, MouseEvent } from "react";
import styles from "./styles/SubmitButton.module.scss";

interface SubmitButtonProps {
  label: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const SubmitButton: FC<SubmitButtonProps> = ({ label, onClick }) => {
  return (
    <button className={styles.submit} onClick={onClick}>
      {label}
    </button>
  );
};

export default SubmitButton;
