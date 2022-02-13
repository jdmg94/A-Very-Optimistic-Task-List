import React, { useRef, useEffect } from 'react'
import styles from './Input.module.css'

const Input = ({ autoFocus, ...props }) => {
  const inputRef = useRef()
  
  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus() 
    }   
  }, [autoFocus])
  
  return <input className={styles.input} ref={inputRef} {...props} />
}

export default Input
