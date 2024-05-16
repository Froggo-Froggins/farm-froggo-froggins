'use client'
import styles from './tasksPage.module.css'
import Topbar from "../components/topbar/Topbar";
import User from "../components/user/User";
import Points from '../components/points/Points';
import Tasks, { ITask } from '../components/tasks/Tasks';
import { useUserData } from '../context';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const tasks: ITask[] = [
  // { desc: "Complete the profile setup", points: 10, link: "/profile",taskButtonText:"Start" },
  // { desc: "Join the community chat", points: 15, link: "/chat",taskButtonText:"Start" },
  // { desc: "Refer a friend", points: 20, link: "/refer",taskButtonText:"Start" },
  // { desc: "Submit a feedback form", points: 5, link: "/feedback",taskButtonText:"Start" },
  // { desc: "Complete a survey", points: 25, link: "/survey",taskButtonText:"Start" },
];

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText("111111111");
  } catch (error) {
    console.error('Failed to copy:', error);
  }
};

export default function TasksPage() {
  const [showMessage, setShowMessage] = useState(false);
  const userData = useUserData();
  const copyRef = useRef(null);
  const [isMobile,setIsMobile] = useState(false);

  const handleCopy = () => {
    if (userData) {
      copyToClipboard().then(() => {
        setShowMessage(true); // Show the message
        setTimeout(() => {
          setShowMessage(false); // Hide the message after 2 seconds
        }, 1300);
      });
    }
  };

  useEffect(() => {
    if(window)
    if (window.innerWidth < 800) {
      setIsMobile(true);
    }
  }, []);
  
  return (
    <div className={styles.tasksPage}>
      <Topbar/>
      <User/>
      {userData && (
        <div className={styles.copyHolder}>
          <h1>Your Referral Code: 111111111</h1>
          <div className={styles.copyButton} onClick={handleCopy} ref={copyRef}>
            <Image style={{filter:"invert(100%)"}} src="/archives.png" alt="Copy" width={20} height={20} />
          </div>
        </div>
      )}
      <span style={{fontSize:'1.3rem', color:`${showMessage?'white':'transparent'}`}}>Copied to clipboard!</span>
      {userData && (
        <h1 className={styles.walletAddress} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {isMobile ? `${userData.wallet.slice(0, 3)}...${userData.wallet.slice(-3)}` : userData.wallet}
        </h1>
      )}
      <Points points={0} referalPoints={0} referals={0}/>
      {tasks.length > 0 ? (
        <Tasks currentTasks={tasks}/>
      ) : (
        <h1 style={{textAlign:'center',padding:'0.5rem'}}>
          {"Good job! All your tasks are complete! 😊"}
        </h1>
      )}
    </div>
  );
}
