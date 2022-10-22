import { useContext } from 'react';
import { SettingsContext } from './settings';
// use an array to handle displaying items. It should be:
//  [ [1, 2, 3]     [4, 5, 6]     [7, 8, 9] ]            
//        ^       (1st in queue) (2nd in queue)          
//  (2nd in queue)      ^        (1st in queue)          
//  (1st in queue)(2nd in queue)      ^                  
const List = (props) => {
  const settings = useContext(SettingsContext);
  return (
    <>
        {
          props.list.map(item => (
            <div key={item.id}>
              <p>{JSON.stringify(settings)}</p>
              <p>{item.text}</p>
              <p><small>Assigned to: {item.assignee}</small></p>
              <p><small>Difficulty: {item.difficulty}</small></p>
              <div onClick={() => props.toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
              <hr />
            </div>
          ))
        }
    </>
  )
}
export default List;