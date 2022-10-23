import { useState, useEffect } from 'react';

const useForm = (callback: any, defaultValues={}) => {

  const [values, setValues] = useState({});

  const handleSubmit = (event: any) => {
    event.preventDefault();
    callback(values);
  };

  const handleChange = (event: any) => {
    event.persist(); // persist allows access to synthetic events inside asynch callbacks

    let { name, value } = event.target;
    if (parseInt(value)) {
      value = parseInt(value);
    }

    setValues(values => ({ ...values, [name]: value }));
  };

  useEffect( () => {
    setValues( defaultValues );
  }, [defaultValues]);

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;