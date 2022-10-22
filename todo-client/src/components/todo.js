import React, { useEffect, useState } from 'react';
import useForm from '../hooks/form';

import { v4 as uuid } from 'uuid';
import List from './list'
import FormComponent from './formComponent'

const ToDo = () => {

  const [defaultValues] = useState({difficulty: 4,});
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    // TODO: validate against duplicate items
    item.id = uuid();
    item.complete = false;
    console.log(item);
    setList([...list, item]);// this is a callback to state lift from form
  }

  function deleteItem(id) {
    // TODO: item delete button(s)
    const items = list.filter( item => item.id !== id );
    setList(items);
  }

  function toggleComplete(id) {

    const items = list.map( item => {
      if ( item.id === id ) {
        item.complete = ! item.complete;
      }
      return item;
    });

    setList(items);

  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`; // TODO: find out why this is returning the value -1. Easy solve is incomplete+1 but that doesn't fix anything
  }, [list]);

  return (
    <>
      <header>
        <h1>To Do List: {incomplete} items pending</h1>
      </header>


      <FormComponent handleSubmit={handleSubmit} handleChange={handleChange} defaultValues={defaultValues} />
      <List list={list} toggleComplete={toggleComplete}/>
    </>
  );
};

export default ToDo;