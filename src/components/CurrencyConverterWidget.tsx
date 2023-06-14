import React, {
  MouseEvent,
  useState,
  FormEvent,
  useEffect,
  useRef,
} from "react";
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
import FormRow from "./Form/FormRow";
import FormColumn from "./Form/FormColumn";
import { fetcher } from "../api/currencyApi";

interface CurrencyChange {
  from: string;
  to: string;
  rate: number;
  fromAmount: number;
  toAmount: number;
}

function CurrencyConverterWidget() {
  // Initial values
  const initialValues: CurrencyChange = {
    from: "EUR",
    to: "GBP",
    rate: 1,
    fromAmount: 100,
    toAmount: 100,
  };

  const apiUrl = `https://my.transfergo.com/api/fx-rates`;

  const [formValues, setFormValues, isFormValid, errorMessage, validateForm] =
    useForm(initialValues, CurrencyValidationSchema);

  const [loading, setLoading] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);

  const triggerRender = () => {
    return isFormValid === true && isSubmitted === true;
  };

  const isConvertFrom = useRef(true);

  const apiFromQuery = `?from=${formValues.from}&to=${formValues.to}&amount=${formValues.fromAmount}`;
  const apiToQuery = `?from=${formValues.to}&to=${formValues.from}&amount=${formValues.toAmount}`;

  const { data, isLoading } = useSWR(
    !triggerRender()
      ? null
      : `${apiUrl}${isConvertFrom.current ? apiFromQuery : apiToQuery}`,
    fetcher,
    {
      revalidateOnFocus: true,
    }
  );

  // call API if isSubmitted and dataChanged.
  useEffect(() => {
    if (isSubmitted) {
      if (isConvertFrom.current) {
        setFormValues((prevValues) => ({
          ...prevValues,
          rate: data?.rate,
          toAmount: data?.toAmount,
        }));
      } else {
        setFormValues((prevValues) => ({
          ...prevValues,
          fromAmount: data?.toAmount,
        }));
      }
    }
  }, [isSubmitted, data]);

  const handleSubmit = async (e: MouseEvent | FormEvent) => {
    e.preventDefault();
    validateForm(formValues);
    if (isFormValid) {
      try {
        setLoading(true);
        setSubmitted(true);
      } catch (error) {
        setLoading(false);
        setSubmitted(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = async (
    fieldName: string,
    value: string | number | null
  ) => {
    const newValues = { ...formValues, [fieldName]: value };
    setFormValues(newValues);
    if (isConvertFrom.current) validateForm(newValues);
    isConvertFrom.current = fieldName === "fromAmount";
  };

  return (
    <form onSubmit={handleSubmit} className={styles.selectContainer}>
      <FormRow>
        <FormColumn>
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
        </FormColumn>

        <IoIosSwap
          className={styles.swapIcon}
          onClick={() => {
            const newValues = {
              ...formValues,
              from: formValues.to,
              to: formValues.from,
            };
            setFormValues({
              ...newValues,
            });
            validateForm(newValues);
          }}
        ></IoIosSwap>

        <FormColumn>
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
        </FormColumn>
      </FormRow>

      <FormRow>
        <FormColumn>
          <InputLabel label="Amount:" />
          <NumberInput
            value={formValues?.fromAmount ? formValues.fromAmount : 100}
            currency={formValues.from}
            onChange={(e) => {
              handleChange("fromAmount", e);
            }}
          />
        </FormColumn>
        {isSubmitted && !loading && (
          <FormColumn className={`${styles.toAmountField}`}>
            <InputLabel label="Converted To:" />
            <NumberInput
              value={formValues?.toAmount ? formValues.toAmount : 100}
              currency={formValues.to}
              onChange={(e) => {
                handleChange("toAmount", e);
              }}
            />
          </FormColumn>
        )}
      </FormRow>
      <FormRow>
        {!isSubmitted && (
          <SubmitButton label="Submit" onClick={handleSubmit}></SubmitButton>
        )}
        {!isLoading && isSubmitted && isFormValid && (
          <div className={styles.responseWrapper}>
            <IoIosRadioButtonOff />{" "}
            <span>
              1 {formValues.from} = {formValues.rate} {formValues.to}
            </span>
            <p className={styles.subText}>
              All figures are live mid-market rates, which are for informational
              purposes only. To see the rates for money transfer, please select
              sending money option.
            </p>
          </div>
        )}
      </FormRow>
      {isLoading && (
        <div className={styles.loaderWrapper}>
          <ClipLoader />
        </div>
      )}
      {!isFormValid && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </form>
  );
}

export default CurrencyConverterWidget;
