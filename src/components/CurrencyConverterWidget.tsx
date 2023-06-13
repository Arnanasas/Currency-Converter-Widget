import React from 'react';
import currenciesData from './currencies.json';
import styles from './styles/CurrencyConverterWidget.module.scss';
import Select from 'react-select';
import {IoIosSwap} from 'react-icons/io';
import useForm from '../hooks/useForm';
import InputLabel from './Form/inputLabel';
import SubmitButton from './Form/SubmitButton';
import NumberInput from './Form/NumberInput';




function CurrencyConverterWidget() {
    
    const [formValues, setFormValues] = useForm();

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
          onChange={e => {setFormValues({...formValues, from: e ? e.value : ""});}}
        />
      </div>

      <IoIosSwap className={styles.swapIcon} onClick={() => setFormValues({...formValues, from: formValues.to, to: formValues.from})}></IoIosSwap>

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
          onChange={e => {setFormValues({...formValues, to: e ? e.value : ""});}}
        />
      </div>
      </div>
      <div className={styles.formRow}>
      <div className={styles.selectColumn}>
        <InputLabel label="Amount:"></InputLabel>
        <NumberInput value={formValues.amount} currency={formValues.from} onChange={e => setFormValues({...formValues, amount: e})} />
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
            <SubmitButton label="Submit"></SubmitButton>
      </div>
    </form>
  );
}

export default CurrencyConverterWidget;