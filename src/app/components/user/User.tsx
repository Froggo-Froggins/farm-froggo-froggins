'use client'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'
import styles from './user.module.css'
import { useUserData } from '@/app/context'

const User = () => {
  const userData = useUserData();
  const router = useRouter();
  const [shouldRedirect, setShouldRedirect] = React.useState(false);

  React.useEffect(() => {
    if (userData.wallet.length === 0) {
      setShouldRedirect(true);
    }
  }, [userData.wallet.length]);

  if (shouldRedirect) {
    router.push('/');
    return null; 
  }

  const profileImageUrl = userData.imageUrl.replace("_normal", "");

  return (
    <div className={styles.user}>
      {userData && <h1>{userData.username}</h1>}
      {profileImageUrl && <Image src={profileImageUrl} alt="avatar" width={100} height={100} style={{ borderRadius: '50%' }} />}
    </div>
  )
}

export default User
