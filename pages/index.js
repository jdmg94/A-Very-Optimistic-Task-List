import Head from 'next/head'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import Input from '../components/Input'
import Button from '../components/Button'
import { Row } from '../components/Flexbox'
import TaskList from '../sections/TaskList'
import { addItem } from './index.thunks'

const App = () => {
  const dispatch = useDispatch()
  const [input, updateInput] = useState('')
  
  const submitItem = (evt) => {
    evt.preventDefault();

    if (input.length > 0) {
      dispatch(addItem(input))
      updateInput('')      
    }
  }
  
  return (
    <>
      <Head>
        <title>Optimistic UI Demo</title>
      </Head>
      <Row style={{ justifyContent: 'center' }}>
        <h1>Very Optimistic To-Do List!</h1>        
      </Row>
      <Row
        as="form"        
        onSubmit={submitItem} 
        style={{ alignItems: 'center' }}
      >       
        <Input
          value={input}
          placeholder="What are we getting done today?"
          onChange={(evt) => updateInput(evt.target.value)}
        />
        <Button 
          type="submit"
          style={{ marginLeft: '8px' }}
        >
         ✅
        </Button>
      </Row>               
      <TaskList />
    </>
  )  
}

export default App
