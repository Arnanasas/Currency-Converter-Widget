import React, {useState} from 'react';

interface CurrencyChange {
    from: string;
    to: string;
    amount: number;
    toAmount: number;
  }
  
  const useForm = (): [CurrencyChange, React.Dispatch<React.SetStateAction<CurrencyChange>>] => {
    const [formValues, setFormValues] = useState<CurrencyChange>({
      from: 'EUR',
      to: 'GBP',
      amount: 100,
      toAmount: 0,
    });
  
    return [formValues, setFormValues];
  };
  
  export default useForm;