import React, {MouseEvent} from 'react';
import currenciesData from './currencies.json';
import styles from './styles/CurrencyConverterWidget.module.scss';
import Select from 'react-select';
import {IoIosSwap} from 'react-icons/io';
import useForm from '../hooks/useForm';
import InputLabel from './Form/inputLabel';
import SubmitButton from './Form/SubmitButton';
import NumberInput from './Form/NumberInput';
import CurrencyValidationSchema from './Form/CurrencyValidationSchema';
import ErrorMessage from './Form/ErrorMessage';

interface CurrencyChange {
  from: string;
  to: string;
  amount: number;
  toAmount: number;
}


function CurrencyConverterWidget() {
  const initialValues: CurrencyChange = {
    from: 'EUR',
    to: 'GBP',
    amount: 100,
    toAmount: 1,
  };
    
    const [formValues, setFormValues, isFormValid, errorMessage, validateForm] = useForm(initialValues, CurrencyValidationSchema);

    const handleSubmit = (e: MouseEvent) => {
        e.preventDefault();
        // console.log(formValues);
        validateForm(formValues);
        console.log(isFormValid);
    };

    const handleChange = (fieldName: string, value: string | number | null) => {
      const newValues = { ...formValues, [fieldName]: value };
      setFormValues(newValues);
      validateForm(newValues);
      };

  return (
    <form action="#" className={styles.selectContainer}>
        <div className={styles.formRow}>
      <div className={styles.selectColumn}>
        <InputLabel label="From:"/>
        <Select
          options={currenciesData}
          name="from"
          value={currenciesData.find(item => item.value === formValues.from)}
          isSearchable={false}
          formatOptionLabel={currency => (
            <div className={styles.selectWrapper}>
              <img src={`https://www.transfergo.com/static/images/flags/svg/${currency.code.toUpperCase()}.svg`} className={styles.countryImage} alt="-image" />
              <span>{currency.value}</span>
            </div>
          )}
          onChange={e => {handleChange('from', e ? e.value : null);}}
        />
      </div>

      <IoIosSwap className={styles.swapIcon} onClick={() => {setFormValues({...formValues, from: formValues.to, to: formValues.from}); validateForm(formValues);}}></IoIosSwap>

      <div className={styles.selectColumn}>
        <InputLabel label="To:"/>
        <Select
          options={currenciesData}
          name="to"
          value={currenciesData.find(item => item.value === formValues.to)}
          isSearchable={false}
          formatOptionLabel={currency => (
            <div className={styles.selectWrapper}>
              <img src={`https://www.transfergo.com/static/images/flags/svg/${currency.code.toUpperCase()}.svg`} className={styles.countryImage} alt="-image" />
              <span>{currency.value}</span>
            </div>
          )}
          onChange={e => {handleChange('to', e ? e.value : null);}}
        />
      </div>
      </div>
      <div className={styles.formRow}>
      <div className={styles.selectColumn}>
        <InputLabel label="Amount:"></InputLabel>
        <NumberInput value={formValues.amount} currency={formValues.from} onChange={e => {handleChange('amount', e ? e : '');}} />
      </div>
      {/* <div className={styles.selectColumn}>
        <InputLabel label="Amount:"></InputLabel>
        <div className={`${styles.inputIcon} ${styles.inputIconRight}`}>
            <input type="number" className={styles.textInput} />
            <i>{formValues.from}</i>
        </div>
      </div> */}
      </div>
      <div className={styles.formRow}>
            <SubmitButton label="Submit" onClick={handleSubmit}></SubmitButton>
      </div>
      {!isFormValid ? <ErrorMessage>{errorMessage}</ErrorMessage> : ''}
    </form>
  );
}

export default CurrencyConverterWidget;