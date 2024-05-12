'use client'
import React from 'react'
import styles from './button.module.css'

const CustomButtom = ({text,link,other= false}:{text:string,link:string,other?:boolean}) => {
    const handleClick = () => {
        window.open(link, '_blank');
      };
    
  return (
    <div onClick={handleClick} className={`${styles.customButton} ${other?styles.other:''}`}>
        {text}
    </div>
  )
}

export default CustomButtom