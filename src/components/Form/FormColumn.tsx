import React, { FC, ReactNode } from "react";
import styles from "./styles/FormColumn.module.scss";

interface FormColumnProps {
  children: ReactNode;
  className?: string;
}

const FormColumn: FC<FormColumnProps> = ({ children, className }) => {
  return <div className={`${styles.formColumn} ${className}`}>{children}</div>;
};

export default FormColumn;
