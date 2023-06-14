import React, { FC, ChangeEvent } from "react";
import styles from "./styles/NumberInput.module.scss";

type NumberInputProps = {
  value: number | string;
  onChange: (value: number) => void;
  currency: string;
};

const NumberInput: FC<NumberInputProps> = ({ value, onChange, currency }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value) || "";
    onChange(newValue as number);
  };

  return (
    <div className={`${styles.inputIcon} ${styles.inputIconRight}`}>
      <input
        type="number"
        className={styles.textInput}
        value={value}
        onChange={handleInputChange}
      />
      <i>{currency}</i>
    </div>
  );
};

export default NumberInput;
