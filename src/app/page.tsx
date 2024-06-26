'use client'
import Topbar from "./components/topbar/Topbar";
import CustomButton from "./components/button/Button";
import { SessionProvider } from "next-auth/react";
import Connect from "./components/connect/Connect";
import { useUserData } from "./context";
import { useEffect, useState, Suspense } from "react";
import Socials from "./components/socials/Socials";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeContent = () => {
  const userData = useUserData();
  const isTwitterAndWalletConnect = userData.wallet !== undefined && userData.wallet !== "" && userData.username !== undefined && userData.username !== "" && userData.wallet.length > 0 && userData.username.length > 0;
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [accountCreated, setAccountCreated] = useState(false);
  const [jwtValid, setJwtValid] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryReferralCode = searchParams.get('referralCode');

  useEffect(() => {
    if (queryReferralCode && queryReferralCode !== userData.inputedReferralCode) {
      localStorage.setItem("froggins_rc",queryReferralCode);
      userData.setInputedReferralCode(queryReferralCode);
    }
  }, [queryReferralCode, userData]);

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleRepeatPasswordChange = (e: any) => {
    setRepeatPassword(e.target.value);
  };


  const notify = (text: string) => toast(text, { closeOnClick: true, theme: 'dark' });

  const createUser = async () => {
    try {
      const rc = userData.inputedReferralCode ?? localStorage.getItem("froggins_rc");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Security-Hash': process.env.NEXT_PUBLIC_SECURITY_HASH!,
        },
        body: JSON.stringify({
          twitter_id: userData.username,
          solana_adr: userData.wallet,
          reffer_code: rc,
          password
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('froggins_jwt', data.jwt);
        setAccountCreated(true);
        setJwtValid(true);
        userData.setUserReferrerCode(data.user.referral_code);

        return true;
      } else {
        try {
          const loginTry = await loginUser(userData.username, password, userData.wallet)
          return loginTry;
        } catch (e) {
          notify("Something went wrong...")
          return false;
        }
      }

    } catch (error) {
      try {
        const loginTry = await loginUser(userData.username, password, userData.wallet)
        return loginTry;
      } catch (e) {
        notify("Something went wrong...")
        return false;
      }
    }
  }

  const validateJwt = async (jwt: string) => {
    try {
      let bodyData = {
        solana_adr:userData.wallet,
        username:userData.username
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/validate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json',
          'X-Security-Hash': process.env.NEXT_PUBLIC_SECURITY_HASH!,
        },
        body:JSON.stringify(bodyData)
      });
      const responseData = await response.json();

      if (!response.ok) {
        notify("Invalid credentials.")
        setJwtValid(false);
        localStorage.removeItem("froggins_jwt")
        return false
      }

      const finishedTasks = responseData.claims.finished_tasks;
      const referrals_count = responseData.claims.referrals_count
      const referrals_points = responseData.claims.referrals_points
      const total_points = responseData.claims.total_points
      const multiplier = responseData.claims.multiplier

      userData.setUserFinishedTasks(finishedTasks);
      userData.setPoints({ total: total_points, referralsPoints: referrals_points, referrals: referrals_count,multiplier })
      userData.setUserReferrerCode(responseData.claims.referral_code);

      setAccountCreated(true)
      setJwtValid(true);

      return true;
    } catch (error) {
      setJwtValid(false);
      return false;
    }
  }

  const loginUser = async (twitter_id: string, password: string, solana_adr: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Security-Hash': process.env.NEXT_PUBLIC_SECURITY_HASH!,
        },
        body: JSON.stringify({
          twitter_id,
          solana_adr,
          password,
        })
      });

      const responseData = await response.json();
      if (responseData.error) {
        notify(responseData.error)
        return false;
      }

      if (!response.ok) {
        notify("Something went wrong...")
        return false;
      }

      if (responseData.jwt) {
        localStorage.setItem('froggins_jwt', responseData.jwt);
        setJwtValid(true);

        const userPoints = {
          total: responseData.user.total_points,
          referralsPoints: responseData.user.referral_points,
          referrals: responseData.user.referred_by.length,
          multiplier:responseData.user.multiplier
        };
        const userFinishedTasks = responseData.user.finished_tasks;

        userData.setPoints(userPoints);
        userData.setUserFinishedTasks(userFinishedTasks);
        userData.setUserReferrerCode(responseData.user.referral_code);

        return true;
      } else {
        return false;
      }
    } catch (error) {
      notify("Something went wrong...")
      return false;
    }
  }

  const handleSubmit = async () => {
    if (password.length < 3) {
      notify("Passwords must be longer than 3 characters.")
      return

    }
    if (password !== repeatPassword) {
      notify("Passwords dont match.")
      return
    }
    if (!isTwitterAndWalletConnect) {
      notify("Twitter or wallet not connected.")
      return false};

    await createUser();
  };

  useEffect(() => {
    const validateJwtFunc = async () => {
      const storedJwt = localStorage.getItem("froggins_jwt");
      if (storedJwt && storedJwt !== "") {
        await validateJwt(storedJwt);
      } else {
        notify("Please login!")
      }
    }
  
    if (userData.wallet && userData.username) {
      validateJwtFunc();
    }
  }, [userData.wallet, userData.username]);

  return (
    <>
      <Topbar />
      <h1 style={{ textAlign: 'center', padding: '0.5rem' }}>Farm $FROGGINS by completing tasks!</h1>
      <div className="helerDiv">
        <h1 style={{textAlign:'center'}}>Login/Signup</h1>
      <div className={"holder"}>
        <div className="customButtonHolder">
          <SessionProvider>
            <Connect />
          </SessionProvider>
        </div>
        {!jwtValid &&
          <div className="passwordForm">
            <div className="passwordInput">
              <span>Password</span>
              <input type="password" onChange={handlePasswordChange} placeholder="" />
            </div>
            <div className="passwordInput">
              <span>Repeat Password</span>
              <input type="password" onChange={handleRepeatPasswordChange} placeholder="" />
            </div>
            <CustomButton enabled={true} onClick={async () => {
              const success = await handleSubmit();
              if (success) {
                notify("Success!!!")
                setAccountCreated(true);
              }
            }} text="Submit" />
          </div>
        }
        </div>
        {(accountCreated || jwtValid) &&
          <div style={{ color: "white", textDecoration: 'none', marginTop: '50px' }}>
            <CustomButton enabled={isTwitterAndWalletConnect} onClick={async () => {
              router.push('/tasks');
            }} text="Start farming!" />
          </div>
        }
      </div>
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
        }} />
    </>
  );
};

export default function Home() {
  return (
    <main className={"main"}>
      <Suspense fallback={<div>Loading...</div>}>
        <HomeContent />
      </Suspense>
    </main>
  );
}
