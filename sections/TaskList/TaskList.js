import { memo } from 'react'
import { useSelector } from 'react-redux'

import TaskItem from '../TaskItem'
import styles from './TaskList.module.css'

const TaskList = memo(() => {
  const items = useSelector(({ todoList }) => todoList.items)

  return (
    <div className={styles.listWrapper}>
      {Object.values(items).map((item) => (
        <TaskItem key={item.id} item={item} />
      ))}
    </div>
  )
})

export default TaskList
