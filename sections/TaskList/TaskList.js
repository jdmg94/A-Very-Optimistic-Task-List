import { memo } from 'react'
import { useSelector } from 'react-redux'

import TaskItem from '../TaskItem'
import styles from './TaskList.module.css'

const TaskList = memo(() => {
  const items = useSelector(state => state.todoList.items)

  return (
    <ul className={styles.listWrapper}>
      {Object.values(items).map((item) => (
        <li key={item.id}>
          <TaskItem item={item} />
        </li>
      ))}
    </ul>
  )
})
export default TaskList
