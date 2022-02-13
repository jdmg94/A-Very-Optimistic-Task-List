import React from 'react'
import { animated } from 'react-spring' 
import styles from './Notification.module.css'

const Notification = ({ children, style }) => (
    <animated.div 
      style={style} 
      className={styles.wrapper}
    >
      {children}
    </animated.div>         
  )

export default Notification
