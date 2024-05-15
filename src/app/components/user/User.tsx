'use client'
import Image from 'next/image'
import React from 'react'
import styles from './user.module.css'

const User = ({session}:{session:any}) => {
    // https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/user-profile-images-and-banners
  // Modify the profile image URL to get the original size
  const profileImageUrl = session?.user?.image?.replace("_normal", "");
  return (
    <div className={styles.user}>
        {session?.user && <h1>{session.user.name}</h1> }
        {/* {session?.user && <h1>{session.user.email}  aa</h1> } */}
        {profileImageUrl && <Image src={profileImageUrl} alt="avatar" width={100} height={100} style={{ borderRadius: '50%' }}/> }
    </div>
  )
}

export default User