import React, { FC, ChangeEvent } from "react";
import styles from "./styles/NumberInput.module.scss";

type NumberInputProps = {
  value: number;
  onChange: (value: number) => void;
  currency: string;
};

const NumberInput: FC<NumberInputProps> = ({ value, onChange, currency }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const floatValue = parseFloat(inputValue);

    if (!isNaN(floatValue)) {
      onChange(floatValue);
    }
  };

  return (
    <div className={`${styles.inputIcon} ${styles.inputIconRight}`}>
      <input
        type="number"
        className={styles.textInput}
        value={value}
        onChange={handleChange}
      />
      <i>{currency}</i>
    </div>
  );
};

export default NumberInput;
