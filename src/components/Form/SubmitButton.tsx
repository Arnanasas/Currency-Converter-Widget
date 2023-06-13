import React, {FC} from 'react';
import styles from './styles/SubmitButton.module.scss';

interface SubmitButtonProps {
    label: string
}

const SubmitButton: FC<SubmitButtonProps> = ({ label }) => {
  return <button className={styles.submit}>{label}</button>;
};

export default SubmitButton;
