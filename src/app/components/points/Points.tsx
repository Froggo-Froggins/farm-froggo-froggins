import React from 'react'
import styles from './points.module.css'


const TotalPoints = () => {
  return (<div>
    100
  </div>)
}



const Points = () => {
  return (
    <div className={styles.points}>
      <TotalPoints/>
    </div>
  )
}

export default Points