import React from 'react'
import styles from './tasks.module.css'

export interface ITask{
    desc:string
    points:number,
    link:string,
    taskButtonText:string
}

const Tasks = ({currentTasks}:{currentTasks:ITask[]}) => {
  return (
    <div className={styles.tasks}>
        Tasks
    </div>
  )
}

export default Tasks