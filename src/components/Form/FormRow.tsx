import React, { FC, ReactNode } from "react";
import styles from "./styles/FormRow.module.scss";

interface FormRowProps {
  children: ReactNode;
}

const FormRow: FC<FormRowProps> = ({ children }) => {
  return <div className={styles.formRow}>{children}</div>;
};

export default FormRow;
