import React, { MouseEvent, useState, FormEvent, useEffect } from "react";
import currenciesData from "./currencies.json";
import styles from "./styles/CurrencyConverterWidget.module.scss";
import Select from "react-select";
import { IoIosSwap, IoIosRadioButtonOff } from "react-icons/io";
import useForm from "../hooks/useForm";
import InputLabel from "./Form/InputLabel";
import SubmitButton from "./Form/SubmitButton";
import NumberInput from "./Form/NumberInput";
import CurrencyValidationSchema from "./Form/CurrencyValidationSchema";
import ErrorMessage from "./Form/ErrorMessage";
import ClipLoader from "react-spinners/ClipLoader";
import useSWR from "swr";
import fetchCurrencyData from '../api/currencyApi';


interface CurrencyChange {
  from: string;
  to: string;
  rate: number;
  fromAmount: number;
  toAmount: number;
}

function CurrencyConverterWidget() {
  const initialValues: CurrencyChange = {
    from: "EUR",
    to: "GBP",
    rate: 1,
    fromAmount: 100,
    toAmount: 100,
  };

  const fetcher = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const apiUrl = `https://my.transfergo.com/api/fx-rates`;
  

  const [formValues, setFormValues, isFormValid, errorMessage, validateForm] =
    useForm(initialValues, CurrencyValidationSchema);

    const [loading, setLoading] = useState(false);
    const [isSubmitted, setSubmitted] = useState(false);

    const triggerRender = () => {
      return isFormValid === true && isSubmitted === true;
    };

    const { data, isLoading } = useSWR(!triggerRender() ? null : `${apiUrl}?from=${formValues.from}&to=${formValues.to}&amount=${formValues.fromAmount}`, fetcher, {
      revalidateOnFocus: true,
    });

    useEffect(() => {
      if (isSubmitted) {
        setFormValues((prevValues) => ({
          ...prevValues,
          rate: data?.rate,
          toAmount: data?.toAmount,
        }));
      }
    }, [isSubmitted, data]);



  const handleSubmit = async (e: MouseEvent | FormEvent) => {
    e.preventDefault();
    validateForm(formValues);
    if (isFormValid) {
      try {
        setLoading(true);
        setSubmitted(true);
        // const { from, to, fromAmount } = formValues;
        // const currencyData = await fetchCurrencyData(from, to, fromAmount);
        // console.log(currencyData);
        // setFormValues(currencyData);
      } catch (error) {
        setLoading(false);
        setSubmitted(false);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = async (fieldName: string, value: string | number | null) => {
    const newValues = { ...formValues, [fieldName]: value };
    setFormValues(newValues);
    validateForm(newValues);

    if(isSubmitted) {
        // console.log("susveikiu");
      }
  };
  


  return (
    <form onSubmit={handleSubmit} className={styles.selectContainer}>
      <div className={styles.formRow}>
        <div className={styles.selectColumn}>
          <InputLabel label="From:" />
          <Select
            options={currenciesData}
            name="from"
            value={currenciesData.find(
              (item) => item.value === formValues.from
            )}
            isSearchable={false}
            formatOptionLabel={(currency) => (
              <div className={styles.selectWrapper}>
                <img
                  src={`https://www.transfergo.com/static/images/flags/svg/${currency.code.toUpperCase()}.svg`}
                  className={styles.countryImage}
                  alt={`${currency.label} flag icon`}
                />
                <span>{currency.value}</span>
              </div>
            )}
            onChange={(e) => {
              handleChange("from", e ? e.value : null);
            }}
          />
        </div>

        <IoIosSwap
          className={styles.swapIcon}
          onClick={() => {
            setFormValues({
              ...formValues,
              from: formValues.to,
              to: formValues.from,
            });
            validateForm(formValues);
          }}
        ></IoIosSwap>

        <div className={styles.selectColumn}>
          <InputLabel label="To:" />
          <Select
            options={currenciesData}
            name="to"
            value={currenciesData.find((item) => item.value === formValues.to)}
            isSearchable={false}
            formatOptionLabel={(currency) => (
              <div className={styles.selectWrapper}>
                <img
                  src={`https://www.transfergo.com/static/images/flags/svg/${currency.code.toUpperCase()}.svg`}
                  className={styles.countryImage}
                  alt={`${currency.label} flag icon`}
                />
                <span>{currency.value}</span>
              </div>
            )}
            onChange={(e) => {
              handleChange("to", e ? e.value : null);
            }}
          />
        </div>
      </div>
      <div className={styles.formRow}>
        <div className={styles.selectColumn}>
          <InputLabel label="Amount:" />
          <NumberInput
            value={formValues.fromAmount}
            currency={formValues.from}
            onChange={(e) => {
              handleChange("fromAmount", e ? e : "");
            }}
          />
        </div>
      {isSubmitted && !loading &&  <div className={`${styles.selectColumn} ${styles.toAmountField}`}>
      <InputLabel label="Converted To:" />
          <NumberInput
            value={formValues.toAmount ? formValues.toAmount : 0}
            currency={formValues.to}
            onChange={(e) => {
              handleChange("toAmount", e ? e : 0);
            }}
          />
      </div>
      }
      </div>
      <div className={styles.formRow}>
        {!isSubmitted && <SubmitButton label="Submit" onClick={handleSubmit}></SubmitButton>}
        {!isLoading && isSubmitted && !loading && 
        <div className={styles.responseWrapper}>
        <IoIosRadioButtonOff /> <span>1 {formValues.from} = {formValues.rate} {formValues.to}</span>
          <p className={styles.subText}>All figures are live mid-market rates, which are for informational purposes only. To see the rates for money transfer, please select sending money option.</p>
        </div>
        }
      </div>
      {isLoading && <div className={styles.loaderWrapper}><ClipLoader /></div>}
      {!isFormValid && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </form>
  );
}

export default CurrencyConverterWidget;
