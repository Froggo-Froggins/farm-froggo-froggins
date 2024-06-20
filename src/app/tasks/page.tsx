'use client'
import styles from './tasksPage.module.css';
import Topbar from "../components/topbar/Topbar";
import User from "../components/user/User";
import Points from '../components/points/Points';
import Tasks from '../components/tasks/Tasks';
import { useUserData } from '../context';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Socials from '../components/socials/Socials';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const copyToClipboard = async (userData:any) => {
  try {
    await navigator.clipboard.writeText(`https://farm.frogofroggins.wtf/?referralCode=${userData.userReferrerCode}`);
  } catch (error) {
    console.error('Failed to copy:', error);
  }
};

export default function TasksPage() {
  const [showMessage, setShowMessage] = useState(false);
  const userData = useUserData();
  const copyRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const notify = (text: string) => toast(text, { closeOnClick: true, theme: 'dark' });

  const handleCopy = () => {
    if (userData) {
      copyToClipboard(userData).then(() => {
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 1300);
      });
    }
  };

  const getAllTasks = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Security-Hash': process.env.NEXT_PUBLIC_SECURITY_HASH!,
        },
      });

      const responseData = await response.json();

      const tasks = responseData.tasks;

      setAllTasks(tasks);

      if (!response.ok) {
        notify("Something went wrong...");
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  useEffect(() => {
    if (window) {
      if (window.innerWidth < 800) {
        setIsMobile(true);
      }
    }

    getAllTasks();
  }, []);

  useEffect(() => {
    if (userData.finishedTasks.length > 0) {
      const filtered = allTasks.filter(task => !userData.finishedTasks.includes((task as any).id as number));
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(allTasks);
    }
  }, [userData.finishedTasks, allTasks]);

  return (
    <div className={styles.tasksPage}>
      <Topbar />
      <User />
      {userData && (
        <div className={styles.copyHolder}>
          <h1>Your Referral Code: {`${userData.userReferrerCode.slice(0, 3)}...${userData.userReferrerCode.slice(-3)}`}</h1>
          <div className={styles.copyButton} onClick={handleCopy} ref={copyRef}>
            <Image style={{ filter: "invert(100%)" }} src="/archives.png" alt="Copy" width={20} height={20} />
          </div>
        </div>
      )}
      <span style={{ fontSize: '1.3rem', color: `${showMessage ? 'white' : 'transparent'}` }}>Copied to clipboard!</span>
      {userData && (
        <h1 className={styles.walletAddress} style={{ whiteSpace: 'nowrap', }}>
          {isMobile ? `${userData.wallet.slice(0, 3)}...${userData.wallet.slice(-3)}` : userData.wallet}
        </h1>
      )}
      <Points multiplier={userData.points.multiplier} points={userData.points.total} referalPoints={userData.points.referralsPoints} referals={userData.points.referrals} />
      {filteredTasks.length > 0 ? (
        <Tasks currentTasks={filteredTasks} userData={userData} />
      ) : (
        <h1 style={{ textAlign: 'center', padding: '0.5rem' }}>
          {"Good job! All your tasks are complete! 😊"}
        </h1>
      )}
      <Socials />
      <h2 style={{ textAlign: 'center' }}>© Froggins. All rights reserved.</h2>
      <ToastContainer
        autoClose={2500}
        progressStyle={{ background: "rgb(24, 236, 2)" }}
        progressClassName={'tpcn'}
        toastStyle={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          backgroundColor: 'rgb(62, 53, 71)',
          border: "1px solid white",
          color: 'white',
          padding: '1rem',
          fontSize: '2rem'
        }}
      />
    </div>
  );
}
