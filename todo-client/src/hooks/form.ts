import { useState, useEffect } from 'react';

const useForm = (callback: any, defaultValues={}) => {

  const [values, setValues] = useState({});

  const handleSubmit = (event: any) => {
    //event.preventDefault();
    console.log(event)
    callback(values); // TODO: this needs to be entirely redone from scratch to use mantine's form submit
  };

  const handleChange = (event: any) => {
    //event.persist(); // persist allows access to synthetic events inside asynch callbacks
    event.preventDefault();
    console.log(event.target.value)
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