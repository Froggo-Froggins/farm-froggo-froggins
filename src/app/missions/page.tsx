import Image from "next/image";
import styles from './missionsPage.module.css'
import Topbar from "../components/topbar/Topbar";
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authConfig } from "../api/auth/auth";
import SignInButton from "./signinbutton";

export default async function Missions() {
  
  const ses = await getServerSession(authConfig);

  console.info(ses)
  return (
    <div className={styles.missions}>
        <Topbar/>
        <SignInButton/>
        {ses?.user && <h1>{ses.user.name}</h1> }
    </div>
  );
}
