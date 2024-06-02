'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './connect.module.css'
import CustomButtom from '../button/Button'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useUserData } from '@/app/context'

const Connect = () => {
    const session = useSession();
    const triggeredRef = useRef(false); 

    const { wallet,imageUrl,username,setWallet,setImageUrl,setUsername } = useUserData();

    useEffect(()=>{
        if(session.status==='authenticated'){
            setUsername(session.data.user?.name || '');
            setImageUrl(session.data.user?.image || '')
        }
    },[session])

    const connectWallet = async () => {
        if ("solana" in window) {
            try {
                //@ts-ignore
                await window.solana.connect();
                const provider = window.solana;
                //@ts-ignore
                setWallet(provider.publicKey.toString());
            } catch (e) {
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
            } catch (error:any) {
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
            {wallet === "" &&
                <CustomButtom enabled={true} onClick={() => {
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