import React from 'react'
import styles from './tasks.module.css'
import Task from '../task/Task'

export interface ITask{
    desc:string
    points:number,
    link:string,
    taskButtonText:string
}

const Tasks = ({currentTasks}:{currentTasks:ITask[]}) => {
  return (
    <div className={styles.tasks}>
      <h1 >Tasks</h1>
        <div className={styles.tasksList}>
          {currentTasks.map((task, index) => (
            <Task key={index} {...task} />
          ))}
        </div>
    </div>
  )
}

export default Tasks