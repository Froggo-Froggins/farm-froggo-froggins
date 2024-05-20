'use client'
import React from 'react'
import s from './socials.module.css'
import Image from 'next/image'

const Socials = () => {
  const handleClick = (enable:boolean,link:string) => {
    if(!enable) return;
    window.open(link, '_blank');
  };

  return (
    <div className={s.socials}>
      <Image title='Twitter' className={`${s.daSocial} `} onClick={()=>{handleClick(true,"https://twitter.com/FrogoFroggins")}} src={'/socials/twitter.png'} alt='twitter' width={35} height={35} />
      <Image title='Teleram' className={`${s.daSocial}`}  onClick={()=>{handleClick(true,"https://t.me/frogofroggins/1")}} src={'/socials/telegram.png'} alt='telegram' width={43} height={43} />
      <Image title='CUMMING SOON!' className={`${s.daSocial} ${s.inactive}`} onClick={()=>{handleClick(false,"https://dexscreener.com/")}} src={'/socials/dexscreener.png'} alt='dexscreener' width={42} height={42} />
      <Image title='CUMMING SOON!' className={`${s.daSocial} ${s.inactive}`} onClick={()=>{handleClick(false,"https://google.com")}} src={'/socials/dextools.png'} alt='dextools' width={35} height={40} />
      <Image title='CUMMING SOON!' className={`${s.daSocial} ${s.inactive}`} onClick={()=>{handleClick(false,"https://google.com")}} src={'/socials/raydium.png'} alt='raydium' width={40} height={45} />
      <Image title='CUMMING SOON!' className={`${s.daSocial} ${s.inactive}`} onClick={()=>{handleClick(false,"https://google.com")}} src={'/socials/jupiter.png'} alt='discord' width={46} height={46} style={{scale:'1.2'}}  />
      <Image title='CUMMING SOON!' className={`${s.daSocial} ${s.inactive}`} onClick={()=>{handleClick(false,"https://google.com")}} src={'/socials/birdeye.png'} alt='birdeye' width={50} height={50} />
      <Image title='CUMMING SOON!' className={`${s.daSocial} ${s.inactive}`} onClick={()=>{handleClick(false,"https://www.coingecko.com/")}} src={'/socials/coingecko.png'} alt='coingecko' width={40} height={40} />
      <Image title='CUMMING SOON!' className={`${s.daSocial} ${s.inactive}`} onClick={()=>{handleClick(false,"https://google.com")}} src={'/socials/discord.png'} alt='discord' width={43} height={43} />
      <Image title='CUMMING SOON!' className={`${s.daSocial} ${s.inactive}`} onClick={()=>{handleClick(false,"https://google.com")}} src={'/socials/bubblemaps.png'} alt='bubblemaps' width={43} height={43} />
      <Image title='CUMMING SOON!' className={`${s.daSocial} ${s.inactive}`} onClick={()=>{handleClick(false,"https://coinmarketcap.com/")}} src={'/socials/coinmarketcap.png'} alt='coinmarketcap' width={45} height={45} />
      <Image title='CUMMING SOON!' className={`${s.daSocial} ${s.inactive}`} onClick={()=>{handleClick(false,"https://google.com")}} src={'/socials/mexc.png'} alt='mexc' width={45} height={45} />
    </div>
  )
}

export default Socials