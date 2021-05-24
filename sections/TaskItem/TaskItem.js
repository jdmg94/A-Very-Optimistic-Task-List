import { useState } from "react";
import { useDispatch } from "react-redux";
import Input from "../../components/Input";
import styles from "./TaskItem.module.css";
import Button from "../../components/Button";
import { addNotification } from "../Notifications";
import { removeItem, updateItem } from "../../pages/index.thunks";

const TaskItem = ({ item }) => {
  const dispatch = useDispatch();
  const [isEditing, setEditing] = useState(false);
  const buttonType = isEditing ? "submit" : "button";
  const [input, updateInput] = useState(item.message);

  const saveChanges = (evt) => {
    evt?.preventDefault();

    setEditing(false);
    dispatch(
      updateItem({
        id: item.id,
        message: input,
      })
    )
      .then(({ error }) => {
        if (!error) {
          return dispatch(addNotification("✅ Changes Saved!"));
        }
        dispatch(addNotification("❌ Error saving updates!"));
      })
      .catch(() => {
        dispatch(addNotification("❌ Error saving updates!"));
      });
  };

  const removeTask = () => {
    dispatch(removeItem(item))
      .then(({ error }) => {
        if (!error) {
          return dispatch(addNotification("✅ Successfully removed!"));
        }
        dispatch(addNotification("❌ Error removing item!"));
      })
      .catch(() => {
        dispatch(addNotification("❌ Error removing item!"));
      });
  };

  return (
    <form
      onSubmit={saveChanges}
      className={styles.listItem}
      onBlur={() => setEditing(false)}
      onClick={() => setEditing(true)}
    >
      {isEditing ? (
        <Input
          autoFocus
          value={input}
          onBlur={() => setEditing(false)}
          onChange={(evt) => updateInput(evt.target.value)}
          onKeyDown={(evt) => evt.keyCode === 27 && setEditing(false)}
        />
      ) : (
        <div className={styles.listLabel}>{item.message}</div>
      )}
      <Button
        type={buttonType}
        onClick={(evt) => {
          evt.stopPropagation();

          isEditing ? saveChanges() : removeTask();
        }}
      >
        {isEditing ? "💾" : "❌"}
      </Button>
    </form>
  );
};

export default TaskItem;
