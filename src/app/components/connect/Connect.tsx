//@ts-nocheck
'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './connect.module.css'
import CustomButtom from '../button/Button'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

const Connect = () => {
    const [wallet, setWallet] = useState("");
    const session = useSession();
    const triggeredRef = useRef(false); 


    const connectWallet = async () => {
        if ("solana" in window) {
            try {
                await window.solana.connect();
                const provider = window.solana;
                console.info(provider.publicKey.toString())
                setWallet(provider.publicKey.toString());
            } catch (e) {
                console.info(e)
            }
        }
    }
    

    useEffect(() => {
    
        const attemptConnection = async (retries) => {
            if (triggeredRef.current) return;
            
            if (retries <= 0) {
                console.error("Failed to connect to Solana after multiple attempts");
                return;
            }
    
            try {
                triggeredRef.current = true;
                if ("solana" in window) {
                    await window.solana.connect();
                    const provider = window.solana;
                    setWallet(provider.publicKey.toString());
                } else {
                    throw new Error("Solana not connected");
                }
            } catch (error) {
                console.info(error);
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
    
        attemptConnection(1); // Attempt connection 5 times
    }, []);
    
    

    console.info(session)

    return (
        <div className={styles.connect}>
            {session.status === "unauthenticated" &&
                <CustomButtom onClick={() => {
                    signIn('twitter')
                }} text='Connect X' />
            }
            {session.status === 'authenticated' &&
                <div className={styles.helperDiv}>
                    <CustomButtom onClick={() => {
                        signOut()
                    }} text='Disconnect X' />
                    <div className={styles.innerHelperDiv}>
                    Twitter Connected!
                    <Image className={styles.smallFix} src={'/check.png'} width={20} height={20} alt='check' />
                    </div>
                </div>
            }
            {wallet === "" &&
                <CustomButtom onClick={() => {
                    connectWallet();
                }} text='Connect Wallet' />
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