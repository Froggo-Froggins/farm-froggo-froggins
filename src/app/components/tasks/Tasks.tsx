import React from 'react'
import styles from './tasks.module.css'
import Task from '../task/Task'

export interface ITask{
    id:string,
    description:string
    points:number,
    link:string,
    task_button_text:string
}

const Tasks = ({currentTasks,userData}:{currentTasks:ITask[],userData:any}) => {
  return (
    <div className={styles.tasks}>
      <h1 >Tasks</h1>
        <div className={styles.tasksList}>
          {currentTasks.map((task, index) => (
            <Task key={task.id} taskData={task} userData={userData} />
          ))}
        </div>
       <p style={{textAlign:'center'}}> To ensure the fair distribution of airdrop, we will manually validate some of the tasks. All participants who are not following the rules (deleting tweets, not doing the tasks correctly etc.) will be disqualified! </p>
    </div>
  )
}

export default Tasks