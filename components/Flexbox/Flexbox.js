import styles from './Flexbox.module.css'

export const Row = ({ as: Element = "div", ...props }) => <Element className={styles.row} {...props} />

export const Column = ({ as: Element = "div", ...props }) => <Element className={styles.column} {...props} />