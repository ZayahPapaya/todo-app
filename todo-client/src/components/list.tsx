import React from 'react';
import { useContext } from 'react';
import { SettingsContext } from './settings';
import { Item } from './todo';
import { Pagination, Card, Group, Text, Badge } from '@mantine/core';
import { useState } from 'react';

// interface Item {
//   difficulty?: Marks,
//   id?: string,
//   complete?: boolean,
//   issue: string,
//   description: string,
// }
// interface Marks {
//   value: number,
//   label: string,
// }

// use an array to handle displaying items. It should be:
//  [ [1, 2, 3]     [4, 5, 6]     [7, 8, 9] ]            
//        ^       (1st in queue) (2nd in queue)          
//  (2nd in queue)      ^        (1st in queue)          
//  (1st in queue)(2nd in queue)      ^                  
// DONE: pagination wiith mantine
// TODO: client README
// TODO: Conditional rendering for login / rights
const ListComponent = (props: any) => {
  const [activePage, setPage] = useState(1);

  const settings = useContext(SettingsContext);
  //let page = props.list
  let page: any = [];
  for (let i = 0; i < 10; i++) {
    page.push({ difficulty: { value: 1, label: ':)' }, id: i, complete: false, issue: `test issue number ${i + 1}`, description: `page length is ${page.length + 1} at me`, })
  }
  let pageQuantity = Math.ceil(page.length / settings.viewableItems) - 1;
  let pageLength = page.length;
  let paginationSheets: any = []; // Contains sub-arrays for mantine to display per page;
  for (let i = 0; i < page.length; i++) {
    //console.log(page.length)
    let arr: any = []; // this might be faulty and causes the bug
    for (let j = 0; j < settings.viewableItems; j++) {
      let item = page.shift();
      if (item) arr.push(item); // makes sure to not push undefined if full list runs out without filling a "page"
    }
    paginationSheets.push(arr);
  }


  let subPage = paginationSheets[activePage - 1]
  if (!settings.showCompleted) subPage = subPage.filter((item: Item) => !item.complete)
  subPage = subPage.map((item: Item) => (
      <Card className="cards" shadow="sm" p="lg" radius="md" withBorder key={item.id}>
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>{item.issue}</Text>
          <Badge color="blue" variant="light">
            {item.difficulty?.label}
          </Badge>
        </Group>
        <p><small>Description: {item.description}</small></p>
        <div onClick={() => props.toggleComplete(item.id)}>Complete: {item.complete?.toString()}</div>
      </Card>
  ))
  //<p>{JSON.stringify(settings)}</p>
  return (
    <>
      {
        subPage
      }
      <Pagination className="pagination" total={pageQuantity} page={activePage} onChange={setPage} color="violet" radius="lg" withControls={false} />
    </>
  )
}
export default ListComponent;