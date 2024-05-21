'use client'
import Topbar from "./components/topbar/Topbar";
import CustomButton from "./components/button/Button";
import { SessionProvider, signIn } from "next-auth/react";
import Connect from "./components/connect/Connect";
import Link from "next/link";
import { useUserData } from "./context";
import { useEffect, useState } from "react";
import CustomButtom from "./components/button/Button";
import Socials from "./components/socials/Socials";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
  const userData = useUserData();
  const isButtonEnabled = userData.wallet !== undefined && userData.wallet !== "" && userData.username !== undefined && userData.username !== "" && userData.wallet.length > 0 && userData.username.length > 0;
  const [referralCode, setReferralCode] = useState('');
  const [submitClicked,setSubmitClicked] = useState(false);
  const [hasClickedYes,setHasClickedYes] = useState(false);
  const [hasClickedNo,setHasClickedNo] = useState(false);
  const router = useRouter();
  const notify = (text:string) => toast(text,{closeOnClick:true,theme:'dark'});

  const handleReferralCodeChange = (e:any) => {
    localStorage.setItem("froggins_referralCode", referralCode);
    setReferralCode(e.target.value);
  };

  const handleStartFarming = async () => {
    if (!isButtonEnabled) return false;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SECURITY_HASH}`,
        },
        body: JSON.stringify({ 
          twitter_id:userData.username,
          solana_adr:userData.wallet,
          reffer_code:userData.inputedReferralCode
         }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.info('Farming started:', data);
      return true;
    } catch (error) {
      console.error('Error starting farming:', error);
      return false;
    }
  };
  

  useEffect(() => {
    const storedReferralCode = localStorage.getItem("froggins_referralCode");
    if (storedReferralCode && storedReferralCode !== "") {
      setHasClickedYes(true);
      setSubmitClicked(true);
      setReferralCode(storedReferralCode);
    }
  }, []);

  return (
    <main className={"main"}>
      <Topbar />
      <h1 style={{ textAlign: 'center',padding:'0.5rem' }}>Farm $FROGGINS by completing tasks!</h1>
      <div className="customButtonHolder">
        <SessionProvider>
          <Connect />
        </SessionProvider>
      </div>
      {/* {!hasClickedNo && !hasClickedYes &&
        <div className={`doYou ${!hasClickedNo && !hasClickedYes ? 'hidden' : ''}`}>
          <h1>Do you have a referral link?</h1>
          <div className="doYouButtons">
            <CustomButtom enabled={true} onClick={()=>{
              setHasClickedYes(true)
            }} text='Yes' />
            <CustomButtom enabled={true} onClick={()=>{
              setHasClickedNo(true)
            }} text='No' />
          </div>
        </div>
      }
      {hasClickedYes && !submitClicked &&
        <div className="referralForm">
          <input type="text" value={referralCode} onChange={handleReferralCodeChange} placeholder=" Referral code" />
          <CustomButton enabled={true} onClick={() => {
            setSubmitClicked(true)
            userData.setInputedReferralCode(referralCode);
          }} text="Submit" />
           <CustomButton enabled={true} onClick={() => {
          setHasClickedYes(true)
          setSubmitClicked(true)
          }} text="Skip" />
        </div>
      } */}
      { true &&
        <div style={{ color: "white", textDecoration: 'none', marginTop:'50px' }}>
          <CustomButton enabled={isButtonEnabled} onClick={async() => {
            console.info(userData)
            notify("Comming soon!")
            const success = await handleStartFarming();
            if (success) {
              router.push('/tasks');
            }
          }} text="Start farming!" />
        </div>
      }
      <Socials/>
      <h2 style={{textAlign:'center'}} >© Froggins. All rights reserved.</h2>
      <ToastContainer 
      autoClose={2500}
      progressStyle={{background:"rgb(24, 236, 2)"}}
      progressClassName={'tpcn'}
      toastStyle={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center',
        backgroundColor:'rgb(62, 53, 71)',
        border:"1px solid white",
        color:'white',
        padding:'1rem',
        fontSize:'2rem'
      }}/>
    </main>
  );
}