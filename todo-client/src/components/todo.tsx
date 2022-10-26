import React, { useEffect, useState } from 'react';
import useForm from '../hooks/form';

import { v4 as uuid } from 'uuid';
import ListComponent from './list'
import FormComponent from './formComponent'
import Lightswitch from './Lightswitch'

export interface Item {
  difficulty?: Marks,
  id?: string,
  complete?: boolean,
  issue: string,
  description: string,
}
interface Marks {
  value: number,
  label: string,
}

const ToDo = () => {

  const [list, setList] = useState<Item[]>([]);
  const [incomplete, setIncomplete] = useState(Number);

  function handleSubmit(item: Item) {
    // TODO: validate against duplicate items
    console.log('additem', item);
    const testId = uuid();
    let found = false;
    list.forEach((obj) => {
      console.log(obj.id, testId)
      if(obj.id === testId) found = true;
    });
    if(!found){
      item.id = testId
      item.complete = false;
      setList([...list, item]);
    } else {
      console.log('ID collision');
    }
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
    document.title = `To Do List: ${incomplete}`;
  }, [incomplete, list]);

  return (
    <>
      <header>
        <h1>To Do List: {incomplete} items pending</h1>
      </header>

      <Lightswitch/>
      <FormComponent handleSubmit={handleSubmit}/>
      <ListComponent list={list} toggleComplete={toggleComplete}/>
    </>
  );
};

export default ToDo;