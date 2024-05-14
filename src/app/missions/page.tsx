import Image from "next/image";
import styles from './missionsPage.module.css'
import Topbar from "../components/topbar/Topbar";
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authConfig } from "../api/auth/auth";
import SignInButton from "./signinbutton";

export default async function Missions() {
  
  const ses = await getServerSession(authConfig);

  // https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/user-profile-images-and-banners
  // Modify the profile image URL to get the original size
  const profileImageUrl = ses?.user?.image?.replace("_normal", "");

  return (
    <div className={styles.missions}>
        <Topbar/>
        <SignInButton/>
        {ses?.user && <h1>{ses.user.name}</h1> }
        {profileImageUrl && <Image src={profileImageUrl} alt="avatar" width={200} height={200} style={{ borderRadius: '50%' }}/> }
    </div>
  );
}