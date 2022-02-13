import { memo } from "react"
import { useTransition, config } from "react-spring"
import { useSelector, useDispatch } from "react-redux"

import Notification from "../Notification"
import styles from "./Notifications.module.css"
import { removeNotification } from "."

const Notifications = memo(() => {
  const dispatch = useDispatch()
  const items = useSelector(({ Notifications }) => Notifications)
  const animation = useTransition(items, {
    keys: (item) => item.id,
    from: {
      opacity: 0,
      transform: "translateY(100%)",
    },
    enter: {
      opacity: 1,
      transform: "translateY(0%)",
    },
    leave: [
      {
        opacity: 0,
        config: { duration: 3000 },
      },
      {
        transform: "translateY(100%)",
      },
    ],
    onRest: (x, y, item) => {
      dispatch(removeNotification(item))
    },
  })

  return (
    <div className={styles.container}>
      {animation((style, { id, message }) => (
        <Notification style={style} key={id}>
          {message}
        </Notification>
      ))}
    </div>
  )
})

export default Notifications
