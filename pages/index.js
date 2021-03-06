import Head from "next/head"
import { useState } from "react"
import { useDispatch } from "react-redux"

import Input from "../components/Input"
import { addItem } from "./index.thunks"
import Button from "../components/Button"
import { Row } from "../components/Flexbox"
import TaskList from "../sections/TaskList"
import Notifications, { addNotification } from "../sections/Notifications"

const App = () => {
  const dispatch = useDispatch()
  const [input, updateInput] = useState("")

  const submitItem = (evt) => {
    evt.preventDefault()

    if (input.length > 0) {
      updateInput("")
      dispatch(addItem(input))
        .then(({ error }) => {
          if (!error) {
            return dispatch(addNotification("✅ Successfully added!"))
          }

          return dispatch(addNotification("❌ Error saving item!"))
        })
        .catch(() => {
          dispatch(addNotification("❌ Error saving item!"))
        })
    }
  }

  return (
    <>
      <Head>
        <title>Optimistic UI Demo</title>
      </Head>
      <Row style={{ justifyContent: "center" }}>
        <h1>Very Optimistic List!</h1>
      </Row>
      <Row 
        as="form" 
        onSubmit={submitItem} 
        style={{ alignItems: "center", paddingBottom: '0.5rem' }}
      >
        <Input
          value={input}
          placeholder="What are we getting done today?"
          onChange={(evt) => updateInput(evt.target.value)}
        />        
      </Row>
      <TaskList />
      <Notifications />
    </>
  )
}

export default App
