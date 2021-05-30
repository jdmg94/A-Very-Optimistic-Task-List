import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import Input from "../../components/Input"
import styles from "./TaskItem.module.css"
import Button from "../../components/Button"
import { addNotification } from "../Notifications"
import useClickOutside from '../../utils/useClickOutside'
import { removeItem, updateItem } from "../../pages/Home/index.thunks"

const TaskItem = ({ item }) => {
  const itemRef = useRef()
  const dispatch = useDispatch()
  const [isEditing, setEditing] = useState(false)
  const [input, updateInput] = useState(item.message)

  const saveChanges = (evt) => {
    evt.preventDefault()
    
    if(evt.bubbles) {
      evt.stopPropagation()
    }

    setEditing(false);
    dispatch(
      updateItem({
        id: item.id,
        message: input,
      })
    )
      .then(({ error }) => {
        if (!error) {
          return dispatch(addNotification("✅ Changes Saved!"))
        }
        dispatch(addNotification("❌ Error saving updates!"))
      })
      .catch(() => {
        dispatch(addNotification("❌ Error saving updates!"))
      })
  }
  
  const completeTask = () => {
    dispatch(updateItem({
      id: item.id,
      done: true,
    })).then(() => {
      dispatch(
        addNotification('Look at you handling business 💯')
      )
    })
  }

  const removeTask = () => {
    dispatch(removeItem(item))
      .then(({ error }) => {
        if (!error) {
          return dispatch(addNotification("✅ Successfully removed!"))
        }
        dispatch(addNotification("❌ Error removing item!"))
      })
      .catch(() => {
        dispatch(addNotification("❌ Error removing item!"))
      })
  };
  
  useClickOutside(itemRef, () => setEditing(false))

  return (
    <div 
      ref={itemRef}
      className={styles.listItem}
      onClick={() => !item.done && setEditing(true)}
    >
      {item.done && <span style={{ paddingRight: '0.5rem' }}>✅</span>}
      {isEditing ? (
        <form
          onSubmit={saveChanges}
          className={styles.listLabel}
        >
          <Input
            autoFocus
            value={input}
            onChange={(evt) => updateInput(evt.target.value)}
            onKeyDown={(evt) => evt.keyCode === 27 && setEditing(false)}
          />
          <Button
            type="submit"
            onClick={saveChanges}
          >
            💾
          </Button>
        </form>
      ) : (
        <span className={styles.listLabel}>{item.message}</span>
      )}
      <Button
        type="button"
        onClick={(evt) => {
          evt.stopPropagation()

          isEditing || item.done ? removeTask() : completeTask()
        }}
      >
        {isEditing || item.done ? "❌" : "✅"}
      </Button>
    </div>
  )
}

export default TaskItem
