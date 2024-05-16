'use client'
import { ReactNode, createContext, useContext, useState } from "react";

interface UserDataContextType {
    wallet: string,
    imageUrl: string,
    username: string,
    setWallet: (wallet: string) => void,
    setImageUrl: (imageUrl: string) => void,
    setUsername: (username: string) => void,
    setInputedReferralCode:(input:string)=>void,
    inputedReferralCode:string
}


interface Points {
    total:number,
    referrals:number,
    referralsPoints:number
}

interface UserData {
    wallet: string,
    imageUrl: string,
    username: string,
    inputedReferralCode:string
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

const initialUserData: UserData = {
    wallet: '',
    imageUrl: '',
    username: '',
    inputedReferralCode:''
};

const initialPoints: Points = {
    total: 0,
    referrals: 0,
    referralsPoints: 0
};

export function useUserData() {
    const context = useContext(UserDataContext);
    if (!context) {
        throw new Error('useUserData must be used within UserDataProvider');
    }
    return context;
}

export function UserDataProvider({ children }: { children: ReactNode }) {
    const [userData, setUserData] = useState<UserData>(initialUserData);
    const [points, setPoints] = useState<Points>(initialPoints);

    const setWallet = (wallet: string) => {
        setUserData(prevUserData => ({ ...prevUserData, wallet }));
    };

    const setImageUrl = (imageUrl: string) => {
        setUserData(prevUserData => ({ ...prevUserData, imageUrl }));
    };

    const setUsername = (username: string) => {
        setUserData(prevUserData => ({ ...prevUserData, username }));
    };

    const setInputedReferralCode = (inputedReferralCode: string) => {
        setUserData(prevUserData => ({ ...prevUserData, inputedReferralCode }));
    };

    const contextValue = {
        ...userData,
        setWallet,
        setImageUrl,
        setUsername,
        setInputedReferralCode,
        inputedReferralCode: userData.inputedReferralCode,
        points,
        setPoints,
    };

    return (
        <UserDataContext.Provider value={contextValue}>
            {children}
        </UserDataContext.Provider>
    );
}