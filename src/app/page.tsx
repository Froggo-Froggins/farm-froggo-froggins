'use client'
import Topbar from "./components/topbar/Topbar";
import CustomButton from "./components/button/Button";
import { SessionProvider, signIn } from "next-auth/react";
import Connect from "./components/connect/Connect";
import Link from "next/link";
import { useUserData } from "./context";
import { useEffect, useState } from "react";
import CustomButtom from "./components/button/Button";

export default function Home() {
  const userData = useUserData();
  const isButtonEnabled = userData.wallet !== undefined && userData.wallet !== "" && userData.username !== undefined && userData.username !== "" && userData.wallet.length > 0 && userData.username.length > 0;
  const [referralCode, setReferralCode] = useState('');
  const [submitClicked,setSubmitClicked] = useState(false);
  const [hasClickedYes,setHasClickedYes] = useState(false);
  const [hasClickedNo,setHasClickedNo] = useState(false);

  const handleReferralCodeChange = (e:any) => {
    localStorage.setItem("froggins_referralCode", referralCode);
    setReferralCode(e.target.value);
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
      <h1 style={{ textAlign: 'center' }}>Farm $FROGGINS by completing tasks!</h1>
      <div className="customButtonHolder">
        <SessionProvider>
          <Connect />
        </SessionProvider>
      </div>
      {!hasClickedNo && !hasClickedYes &&
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
          setSubmitClicked(true);
          }} text="Skip" />
        </div>
      }
      { (hasClickedNo || submitClicked) &&
        <Link style={{ color: "white", textDecoration: 'none', marginTop:'50px' }} href={isButtonEnabled ? '/tasks' : '/'}>
          <CustomButton enabled={isButtonEnabled} onClick={() => {
          }} text="Start farming!" />
        </Link>
      }
    </main>
  );
}