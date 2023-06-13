import React from 'react';
import currenciesData from './currencies.json';
import styles from './styles/CurrencyConverterWidget.module.scss';
import Select from 'react-select';
import {IoIosSwap} from 'react-icons/io';




function CurrencyConverterWidget() {

  return (
    <form action="#" className={styles.selectContainer}>
      <div className={styles.selectColumn}>
        <label className={styles.formLabel}>From:</label>
        <Select
          options={currenciesData}
          name="from"
          value={currenciesData.find(item => item.value === 'EUR')}
          isSearchable={false}
          formatOptionLabel={currency => (
            <div className={styles.selectWrapper}>
              <img src={`https://www.transfergo.com/static/images/flags/svg/${currency.code.toUpperCase()}.svg`} className={styles.countryImage} alt="-image" />
              <span>{currency.value}</span>
            </div>
          )}
          onChange={e => {console.log(e);}}
        />
      </div>
      <IoIosSwap className={styles.swapIcon} onClick={e => {console.log(e);}}></IoIosSwap>
      <div className={styles.selectColumn}>
        <label className={styles.formLabel}>To:</label>
        <Select
          options={currenciesData}
          name="to"
          value={currenciesData.find(item => item.value === 'GBP')}
          isSearchable={false}
          formatOptionLabel={currency => (
            <div className={styles.selectWrapper}>
              <img src={`https://www.transfergo.com/static/images/flags/svg/${currency.code.toUpperCase()}.svg`} className={styles.countryImage} alt="-image" />
              <span>{currency.value}</span>
            </div>
          )}
          onChange={e => {console.log(e);}}
        />
      </div>
    </form>
  );
}

export default CurrencyConverterWidget;