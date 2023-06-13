import React, {useState} from 'react';
  
  const useForm = <T extends object>(initialValues: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [formValues, setFormValues] = useState<T>(initialValues);
  
    return [formValues, setFormValues];
  };
  
  export default useForm;