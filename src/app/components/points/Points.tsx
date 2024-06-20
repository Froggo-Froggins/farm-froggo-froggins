import React from 'react'
import styles from './points.module.css'


const TotalPoints = ({points}:{points:number}) => {
  return (<div className={styles.totalPoints}>
    <span>Total Points</span>
    <span>{points}</span>
  </div>)
}

const ReferalPoints = ({referalPoints,referals}:{referalPoints:number,referals:number})=>{
  return (
    <div className={styles.referalPoints}>
      <div className={styles.left}>
        <span>Total Referrals</span>
        <span>{referals}</span>
      </div>
      <div className={styles.left}>
        <span>Referral Points</span>
        <span>{referalPoints}</span>
      </div>
    </div>
  )
}



const Points = ({points,referalPoints,referals,multiplier}:{points:number,referalPoints:number,referals:number,multiplier:number}) => {
  return (
    <div className={styles.points}>
      <TotalPoints points={points*multiplier}/>
      <ReferalPoints referalPoints={referalPoints*multiplier} referals={referals}/>
    </div>
  )
}

export default Points