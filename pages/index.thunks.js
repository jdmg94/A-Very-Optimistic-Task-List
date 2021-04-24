import { createAsyncThunk } from '@reduxjs/toolkit'

const sleep = timeout => new Promise(resolve => setTimeout(resolve, timeout))

export const addItem = createAsyncThunk('todos/add', async data => {
  
  await sleep(2000)
//  throw new Error('test')

 return { data }
})

export const updateItem = createAsyncThunk('todos/update', async changes => {

  await sleep(1500)
//  throw new Error('test')

  return { changes }
})

export const removeItem = createAsyncThunk('todos/remove', async data => {

  await sleep(1000)
//  throw new Error('test')

  return { data }
})