'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './connect.module.css'
import CustomButtom from '../button/Button'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useUserData } from '@/app/context'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PublicKey } from '@solana/web3.js';

const Connect = () => {
    const session = useSession();
    const triggeredRef = useRef(false);
    const [isMobile, setIsMobile] = useState(false);

    const { wallet, imageUrl, username, setWallet, setImageUrl, setUsername } = useUserData();
    const notify = (text: string) => toast(text, { closeOnClick: true, theme: 'dark' });
    const [showWalletInput, setShowWalletInput] = useState(false);
    const [inputedAddress, setInputedAddress] = useState('');
    const [isValid, setIsValid] = useState(false);
    const isEdgeBrowser = () => {
        return /Edg/.test(navigator.userAgent);
    };
    const handleSave = () => {
        if (isValidSolanaAddress(inputedAddress)) {
          setIsValid(true);
          setWallet(inputedAddress.trim())
        } else {
          setIsValid(false);
          notify("Invalid Solana Address")
        }
      };

    const isValidSolanaAddress = (address:any) => {
        try {
          new PublicKey(address);
          return true;
        } catch (e) {
          return false;
        }
      };

    useEffect(() => {
        if (session.status === 'authenticated') {
            setUsername(session.data.user?.name || '');
            setImageUrl(session.data.user?.image || '')
        }
    }, [session])

    useEffect(() => {
        if (window) {
            if (window.innerWidth < 800) {
                setIsMobile(true);
            }
        }

    }, []);

    const connectWallet = async () => {
        if (isEdgeBrowser()) {
            notify("Edge browser is not supported. Please use Chrome or Brave.");
            return;
        }
        if ("solana" in window) {
            try {
                //@ts-ignore
                await window.solana.connect();
                const provider = window.solana;
                //@ts-ignore
                setWallet(provider.publicKey.toString());
            } catch (e) {
                notify("Something went wrong!")
            }
        } else {
            if (isMobile) {

            } else {
                notify("Please install Phantom Wallet!")
            }
        }
    }


    useEffect(() => {
        //@ts-ignore
        const attemptConnection = async (retries) => {
            if (triggeredRef.current) return;

            if (retries <= 0) {
                console.error("Failed to connect to Solana after multiple attempts");
                return;
            }

            try {
                triggeredRef.current = true;
                if ("solana" in window) {
                    //@ts-ignore
                    await window.solana.connect();
                    const provider = window.solana;
                    //@ts-ignore
                    setWallet(provider.publicKey.toString());
                } else {
                    throw new Error("Solana not connected");
                }
            } catch (error: any) {
                if (error.message.includes("User rejected the request")) {
                    console.error("User rejected the request. Stopping further attempts.");
                    return;
                }
                retries--;
                setTimeout(() => {
                    attemptConnection(retries - 1);
                }, 1000);
            }
        };

        attemptConnection(1);
    }, []);


    return (
        <div className={styles.connect}>
            {session.status === "unauthenticated" &&
                <CustomButtom enabled={true} onClick={() => {
                    signIn('twitter')
                }} text='Connect X' />
            }
            {session.status === 'authenticated' &&
                <div className={styles.helperDiv}>
                    <CustomButtom enabled={true} onClick={() => {
                        signOut()
                    }} text='Disconnect X' />
                    <div className={styles.innerHelperDiv}>
                        Twitter Connected!
                        <Image className={styles.smallFix} src={'/check.png'} width={20} height={20} alt='check' />
                    </div>
                </div>
            }
            {wallet === "" && !showWalletInput &&
                <CustomButtom enabled={true} onClick={() => {
                    if (isMobile) {
                        setShowWalletInput(true);
                    } else {
                        connectWallet();
                    }
                }} text='Connect Wallet' />
            }
            {wallet === "" && showWalletInput &&
            <div className={styles.inputWalletDiv}>
                <div style={{marginBottom:'1rem'}} className="passwordInput">
                    <span>Wallet Address</span>
                    <input type="text" onChange={(e) => {
                        setInputedAddress(e.target.value)
                    }} placeholder="Enter Solana address" />
                </div>
                <CustomButtom enabled={true} onClick={() => {
                    handleSave();
                }} text='Save Address' />
                </div>
            }
            {
                wallet !== "" &&
                <div className={styles.helperDiv}>
                    <span>{`${wallet.slice(0, 10)}...${wallet.slice(-10)}`}</span>
                    <div className={styles.innerHelperDiv}>
                        Wallet Connected!
                        <Image className={styles.smallFix} src={'/check.png'} width={20} height={20} alt='check' />
                    </div>
                </div>
            }
        </div>
    )
}

export default Connect