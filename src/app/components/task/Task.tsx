'use client'
import React, { useEffect, useState } from 'react';
import styles from './task.module.css';
import { ITask } from '../tasks/Tasks';
import Image from 'next/image';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserDataContextType } from '@/app/context';

const Task = ({ taskData, userData }: { taskData: ITask, userData: UserDataContextType }) => {
  const [showLoading, setShowLoading] = useState(false);
  const notify = (text: string) => toast(text, { closeOnClick: true, theme: 'dark' });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
  }, []);
  
  const finishTask = async () => {
    try {
      const storedJwt = localStorage.getItem("froggins_jwt");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/finish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Security-Hash': process.env.NEXT_PUBLIC_SECURITY_HASH!,
          'Authorization': `Bearer ${storedJwt}`
        },
        body: JSON.stringify({
          task_id: taskData.id,
          wallet: userData.wallet
        })
      });

      const rData = await response.json();

      if (!response.ok) {
        return false;
      }

      if (rData.jwt) {
        userData.setUserFinishedTasks([...userData.finishedTasks, parseInt(taskData.id)]);
        localStorage.setItem('froggins_jwt', rData.jwt);
        const userPoints = {
          total: rData.user.total_points,
          referralsPoints: rData.user.referral_points,
          referrals: rData.user.referred_by.length,
          multiplier: rData.user.multiplier
        };
        const userFinishedTasks = rData.user.finished_tasks;
      
        userData.setPoints(userPoints);
        userData.setUserFinishedTasks(userFinishedTasks);
        userData.setUserReferrerCode(rData.user.referral_code);

      }
      return true;
    } catch (error) {
      notify("Something went wrong...");
      return false;
    }
  };

  useEffect(() => {
    if (showLoading) {
      const delay = isMobile ? 0 : Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
      setTimeout(async () => {
        const isFinished = await finishTask();
        if(isFinished){
          setShowLoading(false);
          notify(`You got: ${taskData.points*userData.points.multiplier} points!`);
          userData.setPoints({
            total: userData.points.total + taskData.points,
            referralsPoints: userData.points.referralsPoints,
            referrals: userData.points.referrals,
            multiplier:userData.points.multiplier
          });
        }else {
          notify("Something went wrong...")
        }
      }, delay);
    }
  }, [showLoading]);

  return (
    <div  className={styles.task}>
      <span  style={{padding:`${isMobile?`1rem`:`0rem`}`}} className={styles.taskDesc}>{taskData.description}</span>
      <div className={styles.pointsAndButton}>
        {!showLoading && <span   className={styles.pointsStuf}>{taskData.points} POINTS</span>}
        {!showLoading && (
          <button style={{marginBottom:'1rem'}} className={styles.taskButton} onClick={async () => {
            window.open(taskData.link,"_none")
            setShowLoading(true);
          }}>
            {taskData.task_button_text}
          </button>
        )}
        {showLoading && <span>Validating...</span>}
        {showLoading && <Image className={styles.loading} style={{ filter: 'invert(100%)' }} src={"/loading.png"} width={50} height={50} alt='loading' />}
        {!showLoading || isMobile && <div style={{ width: '50px', height: '50px' }}></div>}
      </div>
    </div>
  );
}

export default Task;
