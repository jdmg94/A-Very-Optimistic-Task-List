import { useSelector } from 'react-redux'

import TaskItem from '../TaskItem'
import styles from './TaskList.module.css'
import { Column } from '../../components/Flexbox'

const isEmpty = list => list?.length > 0

const TaskList = () => {
  const items = useSelector(state => Object.values(state.todoList.items))
  
  return (
    <ul className={styles.listWrapper}>
      {items.map((item) => (
        <li key={item.id}>
          <TaskItem item={item} />
        </li>
      ))}
    </ul>
  )
}

export default TaskList
