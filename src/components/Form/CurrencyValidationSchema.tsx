import * as yup from "yup";

const CurrencyValidationSchema = yup.object().shape({
  from: yup.string().required("From field is required"),
  to: yup.string().required("To field is required"),
  rate: yup.number(),
  fromAmount: yup
    .number()
    .typeError('From amount should be a number > 0!')
    .required("Amount field is required")
    .positive("Amount must be positive")
    .test({
      name: "pln-amount-validation",
      exclusive: true,
      message: "Maximum convertion amount for PLN is 20000",
      test(value) {
        const { from } = this.parent;
        if (from === "PLN") {
          return value < 20000;
        }
        return true;
      },
    })
    .test({
      name: "gbp-amount-validation",
      exclusive: true,
      message: "Maximum convertion amount for GBP is 1000",
      test(value) {
        const { from } = this.parent;
        if (from === "GBP") {
          return value < 1000;
        }
        return true;
      },
    })
    .test({
      name: "eur-amount-validation",
      exclusive: true,
      message: "Maximum convertion amount for EUR is 5000",
      test(value) {
        const { from } = this.parent;
        if (from === "EUR") {
          return value < 5000;
        }
        return true;
      },
    })
    .test({
      name: "uah-amount-validation",
      exclusive: true,
      message: "Maximum convertion amount for UAH is 50000",
      test(value) {
        const { from } = this.parent;
        if (from === "UAH") {
          return value < 50000;
        }
        return true;
      },
    }),
  toAmount: yup.number(),
});

export default CurrencyValidationSchema;
