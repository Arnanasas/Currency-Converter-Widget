import React, { MouseEvent, useState } from "react";
import currenciesData from "./currencies.json";
import styles from "./styles/CurrencyConverterWidget.module.scss";
import Select from "react-select";
import { IoIosSwap, IoIosAddCircle } from "react-icons/io";
import useForm from "../hooks/useForm";
import InputLabel from "./Form/inputLabel";
import SubmitButton from "./Form/SubmitButton";
import NumberInput from "./Form/NumberInput";
import CurrencyValidationSchema from "./Form/CurrencyValidationSchema";
import ErrorMessage from "./Form/ErrorMessage";
import fetchCurrencyData from "../api/currencyApi";
import { useQuery } from "react-query";
import ClipLoader from "react-spinners/ClipLoader";

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

  const [formValues, setFormValues, isFormValid, errorMessage, validateForm] =
    useForm(initialValues, CurrencyValidationSchema);

    const [loading, setLoading] = useState(false);
    const [isSubmitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    validateForm(formValues);
    if (isFormValid) {
      try {
        setLoading(true);
        setSubmitted(true);
        const { from, to, fromAmount } = formValues;
        const currencyData = await fetchCurrencyData(from, to, fromAmount);
        console.log(currencyData);
        setFormValues(currencyData);
      } catch (error) {
        setLoading(false);
        setSubmitted(false);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
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
                  alt="-image"
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
                  alt="-image"
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
          <InputLabel label="Amount:"></InputLabel>
          <NumberInput
            value={formValues.fromAmount}
            currency={formValues.from}
            onChange={(e) => {
              handleChange("fromAmount", e ? e : "");
            }}
          />
        </div>
      {isSubmitted && !loading &&  <div className={styles.selectColumn}>
      <InputLabel label="To Amount:"></InputLabel>
          <NumberInput
            value={formValues.fromAmount}
            currency={formValues.to}
            onChange={(e) => {
              handleChange("fromAmount", e ? e : "");
            }}
          />
      </div>
      }
      </div>
      <div className={styles.formRow}>
        {!isSubmitted && <SubmitButton label="Submit" onClick={handleSubmit}></SubmitButton>}
        {isSubmitted && !loading && 
        <div className={styles.responseWrapper}>
        <IoIosAddCircle /> <span>1 {formValues.from} = {formValues.rate} {formValues.to}</span>
           <p>
            Lorem ipsum
          </p>
        </div>
        }
      </div>
      {loading && <div className={styles.loaderWrapper}><ClipLoader /></div>}
      {!isFormValid ? <ErrorMessage>{errorMessage}</ErrorMessage> : ""}
    </form>
  );
}

export default CurrencyConverterWidget;
