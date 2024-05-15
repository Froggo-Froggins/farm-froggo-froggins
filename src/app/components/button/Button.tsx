'use client'
import React from 'react'
import styles from './button.module.css'

const CustomButtom = ({text,onClick,link,other= false, }:{text:string,link?:string,onClick:any,other?:boolean}) => {
  return (
    <div onClick={onClick} className={`${styles.customButton} ${other?styles.other:''}`}>
        {text}
    </div>
  )
}

export default CustomButtom