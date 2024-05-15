//@ts-nocheck
'use client'
import React, { useEffect, useState } from 'react'
import styles from './connect.module.css'
import CustomButtom from '../button/Button'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

const Connect = () => {
    const [wallet, setWallet] = useState("");
    const session = useSession();


    const connectWallet = async () => {
        if ("solana" in window) {
            try {
                await window.solana.connect();
            } catch (e) {
                console.info(e)
            }
            const provider = window.solana;
            console.info(provider.publicKey.toString())
            setWallet(provider.publicKey.toString());
        }
    }

    useEffect(() => {
        const attemptConnection = async (retries) => {
            try {
                console.info(1111)
                if ("solana" in window) {
                    await window.solana.connect();
                    const provider = window.solana;
                    setWallet(provider.publicKey.toString());
                } else {
                    throw new Error("Solana not connected");
                }
            } catch (error) {
                console.info(error)
                if (retries > 0) {
                    setTimeout(() => {
                        attemptConnection(retries - 1);
                    }, 300);
                } else {
                    console.error("Failed to connect to Solana after multiple attempts");
                }
            }
        };

        attemptConnection(5); // Attempt connection 5 times
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