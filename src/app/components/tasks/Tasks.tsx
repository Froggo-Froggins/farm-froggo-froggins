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
      <h1>Tasks</h1>
        <div className={styles.tasksList}>
          Tasks List
        </div>
    </div>
  )
}

export default Tasks