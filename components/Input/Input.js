import React, { useRef, useEffect } from 'react'
import  styles from './Input.module.css'

const Input = props => {
  const inputRef = useRef()
  
  useEffect(() => {
    if (props.autoFocus) {
      inputRef.current?.focus() 
    }   
  }, [props.autoFocus])
  
  return <input className={styles.input} ref={inputRef} {...props} />
}

export default Input
