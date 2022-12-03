import React, { useEffect, useState } from 'react';
import useForm from '../hooks/form';

import { v4 as uuid } from 'uuid';
import ListComponent from './list'
import FormComponent from './formComponent'
import Lightswitch from './Lightswitch'
import { withAuth0, useAuth0 } from "@auth0/auth0-react";
import Logout from './logout';
import Login from './login';
import Profile from './userAuth'

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
  const { isAuthenticated } = useAuth0();
  const { getAccessTokenSilently } = useAuth0();

  async function handleSubmit(item: Item) {
    // TODO: validate against duplicate items
    console.log('additem', item);
    const serverItem = await serverPut(item);
    console.log('item', serverItem.body)
    const testId = serverItem?._id;
    let found = false;
    list.forEach((obj) => {
      console.log(obj.id, testId)
      if (obj.id === testId) found = true;
    });
    if (!found) {
      item.id = testId
      item.complete = false;
      setList([...list, item]);
    } else {
      console.log('ID collision');
    }
  }

  async function serverPut(item: Item) {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently();
      return await fetch(`${process.env.REACT_APP_SERVER}/history`, {
        headers: { Authorization: `Bearer ${token}` },
        method: 'put',
        body: JSON.stringify({ item })
      });
    }
  }

  async function deleteItem(id: string) {
    // TODO: item delete button(s)
    if (isAuthenticated) {
      const token = await getAccessTokenSilently();
      await fetch(`${process.env.REACT_APP_SERVER}/history`, {
        headers: { Authorization: `Bearer ${token}` },
        method: 'put',
        body: id,
      });
      const items = list.filter(item => item.id !== id);
      setList(items);
    }
  }

  function toggleComplete(id: string) {

    const items = list.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);

  }

  async function populateList() {
    
  }

  useEffect(() => {
    async function fetchData() {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${process.env.REACT_APP_SERVER}/history`, {
          headers: { Authorization: `Bearer ${token}` },
          method: 'get',
        });
        console.log('response', response)
        setList(response);
      }
    }
    console.log(list)
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [incomplete, list]);

  return (
    <>
      <header>
        <h1>To Do List: {incomplete} items pending</h1>
      </header>
      {isAuthenticated ? <><Logout /> <Profile /></> : <Login />}
      <Lightswitch />
      <FormComponent handleSubmit={handleSubmit} />
      <ListComponent list={list} toggleComplete={toggleComplete} />
    </>
  );
};

export default ToDo;