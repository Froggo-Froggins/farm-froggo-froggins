'use client'
import React from 'react'
import styles from './button.module.css'

const CustomButtom = ({text,onClick,link,other= false,enabled=false }:{text:string,link?:string,onClick:any,other?:boolean,enabled?:boolean}) => {
  return (
    <div onClick={()=>{if(enabled)onClick()}} className={`${styles.customButton} ${other?styles.other:''} ${enabled==false?`${styles.notEnable}`:``}`}>
        {text}
    </div>
  )
}

export default CustomButtom