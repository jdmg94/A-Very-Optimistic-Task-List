import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Input from '../../components/Input'
import styles from './TaskItem.module.css'
import Button from '../../components/Button'
import { removeItem, updateItem } from '../../pages/index.thunks'

const TaskItem = ({ item }) => {
  const dispatch = useDispatch()
  const [isEditing, setEditing] = useState(false)
  const [input, updateInput] = useState(item.message)
  
  const buttonType = isEditing ? 'submit' : 'button'
  
  const saveChanges = (evt) => {
    evt?.preventDefault();
    setEditing(false)
    dispatch(updateItem({ 
      id: item.id, 
      message: input, 
      original: item.message
    }))
  } 
    
  return (
    <form
      onSubmit={saveChanges}
      className={styles.listItem}
      onBlur={() => setEditing(false)}      
      onClick={() => setEditing(true)} 
    >
      {isEditing
        ? (
          <Input 
            value={input}     
            onBlur={() => setEditing(false)}
            onChange={(evt) => updateInput(evt.target.value)}
            onKeyDown={evt => evt.keyCode === 27 && setEditing(false)}
          />
        )
        : <div className={styles.listLabel}>{item.message}</div>
      }          
      <Button
        type={buttonType}
        onClick={(evt) => {
          evt.stopPropagation()  
    
          isEditing ? saveChanges() : dispatch(removeItem(item))
        }}
       >
        {isEditing ? '💾' : '❌'}
      </Button>
    </form>
  )
}

export default TaskItem
