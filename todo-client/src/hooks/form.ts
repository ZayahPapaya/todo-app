import { useState, useEffect } from 'react';

const useForm = (callback: any, defaultValues={}) => {

  const [values, setValues] = useState({});

  const handleSubmit = (event: any) => {
    console.log(event)
    callback(values);
  };
  useEffect( () => {
    setValues( defaultValues );
  }, [defaultValues]);

  return {
    handleSubmit,
    values,
  };
};

export default useForm;