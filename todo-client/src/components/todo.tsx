import React, { useEffect, useState } from 'react';
import useForm from '../hooks/form';

import { v4 as uuid } from 'uuid';
import ListComponent from './list'
import FormComponent from './formComponent'
import Lightswitch from './Lightswitch'

export interface Difficulty {
  difficulty: number,
}
export interface Item {
  difficulty?: number,
  id?: string,
  complete?: boolean,
  text?: string,
  assignee?: string,
}

const ToDo = () => {
  const [defaultValues] = useState<Difficulty>({difficulty: 4,});
  const [list, setList] = useState<Item[]>([]);
  const [incomplete, setIncomplete] = useState(Number);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item: Item) {
    // TODO: validate against duplicate items
    item.id = uuid();
    item.complete = false;
    console.log(item);
    setList([...list, item]);// this is a callback to state lift from form
  }

  function deleteItem(id: string) {
    // TODO: item delete button(s)
    const items = list.filter( item => item.id !== id );
    setList(items);
  }

  function toggleComplete(id: string) {

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
  }, [incomplete, list]);

  return (
    <>
      <header>
        <h1>To Do List: {incomplete} items pending</h1>
      </header>

      <Lightswitch/>
      <FormComponent handleSubmit={handleSubmit} handleChange={handleChange} defaultValues={defaultValues} />
      <ListComponent list={list} toggleComplete={toggleComplete}/>
    </>
  );
};

export default ToDo;