import { createAsyncThunk } from '@reduxjs/toolkit'

const sleep = timeout => new Promise(resolve => setTimeout(resolve, timeout))

export const addItem = createAsyncThunk('todos/add', async (data, {
  rejectWithValue 
}) => {
  try {
    await sleep(2000)
  //  throw new Error('test')

    return { data }
  } catch (error) {       
    return rejectWithValue(error.message)
  }
})

export const updateItem = createAsyncThunk('todos/update', async (changes, { rejectWithValue }) => {
try {
    await sleep(1500)
    // throw new Error('test')

    return { changes }
  } catch (error){
    return rejectWithValue(error.message)
  }
})

export const removeItem = createAsyncThunk('todos/remove', async (data, { rejectWithValue }) => {
try {
    await sleep(1000)
  //  throw new Error('test')

    return { data }
  } catch (error){
    return rejectWithValue(error.message)
  }
})