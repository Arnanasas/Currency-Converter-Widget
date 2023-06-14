import React, {useState, useCallback} from 'react';
import { Schema, ValidationError } from 'yup';
  
  const useForm = <T extends object>(
    initialValues: T,
    validationSchema: Schema<T>,
    ): [T, React.Dispatch<React.SetStateAction<T>>, boolean, string, (values: T) => void] => {
    const [formValues, setFormValues] = useState<T>(initialValues);
    const [isFormValid, setIsFormValid] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');

    // const validateForm = () => {
    //   validationSchema
    //     .validate(formValues)
    //     .then(() => {
    //       setIsFormValid(true); 
    //       setErrorMessage('');
    //     })
    //     .catch((error: ValidationError) => {
    //       setIsFormValid(false);
    //       setErrorMessage(error.message);
    //     });
    // };

    const validateForm = useCallback((values: T) => {
      validationSchema
        .validate(values, { abortEarly: false })
        .then(() => {
          setIsFormValid(true);
          setErrorMessage('');
        })
        .catch((error: ValidationError) => {
          setIsFormValid(false);
          setErrorMessage(error.message);
        });
    }, [formValues, validationSchema]);

    return [formValues, setFormValues, isFormValid, errorMessage, validateForm];
  };
  
  export default useForm;