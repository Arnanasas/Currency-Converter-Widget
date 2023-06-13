import React from 'react';
import currenciesData from './currencies.json';
import styles from './styles/CurrencyConverterWidget.module.scss';
import Select from 'react-select';
import {IoIosSwap} from 'react-icons/io';
import useForm from '../hooks/useForm';




function CurrencyConverterWidget() {

    const [formValues, setFormValues] = useForm();


  return (
    <form action="#" className={styles.selectContainer}>
      <div className={styles.selectColumn}>
        <label className={styles.formLabel}>From:</label>
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
        <label className={styles.formLabel}>To:</label>
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
    </form>
  );
}

export default CurrencyConverterWidget;