import React from 'react'
import styles from './task.module.css'
import { ITask } from '../tasks/Tasks'

const Task = (taskData:ITask) => {
  return (
    <div className={styles.task}>
      <span className={styles.taskDesc} >{taskData.desc}</span>
      <div className={styles.pointsAndButton}>
        <span className={styles.pointsStuf}>{taskData.points} POINTS</span>
        <button className={styles.taskButton} onClick={()=>{
          window.open(taskData.link, '_blank');
        }}>{taskData.taskButtonText}</button>
      </div>
    </div>
  )
}

export default Task