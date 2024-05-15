'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Topbar from "./components/topbar/Topbar";
import CustomButton from "./components/button/Button";
import { SessionProvider, signIn } from "next-auth/react";
import Connect from "./components/connect/Connect";
import Link from "next/link";

export default function Home() {
  return (
    <main className={"main"}>
      <Topbar/>
      <h1 style={{textAlign:'center'}}>Farm $FROGGINS by completing tasks!</h1>
      <div className="customButtonHolder">
        <SessionProvider>
        <Connect/>
        </SessionProvider>
      </div>
      <Link style={{color:"white",textDecoration:'none'}} href={'/tasks'}>
        <CustomButton onClick={()=>{
          
        }} text="Start farming!"/>
        </Link> 
    </main>
  );
}
