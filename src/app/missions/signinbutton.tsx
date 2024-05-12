//@ts-nocheck
'use client'

import { signIn, signOut } from 'next-auth/react'
import React from 'react'

const SignInButton = () => {

  const getProvider = async () => {
    if ("solana" in window) {
      await window.solana.connect();

      const provider = window.solana;
      if (provider.isPhantom) {
        console.log("Is Phantom installed?  ", provider.isPhantom);

        return provider;
      }
    } else {
      document.write('Install https://www.phantom.app/');
    }
  };

  const diskonekt = async()=>{
    if ("solana" in window) {
      await window.solana.disconnect();
    }
  }

  // window.onload = () => {

  //   getProvider().then(provider => {
  //       console.log('key', provider.publicKey.toString())
  //   })
  //   .catch(function(error){
  //       console.log(error)
  //   });
  // }

  return (
    <div style={{
      display:'flex',
      gap:'1rem',
      flexDirection:'column'
    }}>
      <button onClick={() => {
        signIn('twitter')
      }}>TWITTER SIGNIN</button>
            <button onClick={() => {
        signOut('twitter')
      }}>TWITTER SIGNOUT</button>
      <button onClick={async () => { const result = await getProvider()
      window.alert(`WALLET ADDRESS: ${result.publicKey.toString()}`)
        console.info(result.publicKey.toString());
       }}>WALLET</button>
    </div>
  )
}

export default SignInButton