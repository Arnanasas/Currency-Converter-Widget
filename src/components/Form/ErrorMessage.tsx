import React, { ReactNode } from 'react';
import styles from './styles/ErrorMessage.module.scss';

type Props = {
    children: ReactNode;
}

const ErrorMessage = ({ children }: Props) => {
  return (
    <div className={styles.errorContainer}>{children}</div>
  );
};

export default ErrorMessage;