'use client'
import { ReactNode, createContext, useContext, useState } from "react";

interface UserDataContextType {
    wallet: string,
    imageUrl: string,
    username: string,
    setWallet: (wallet: string) => void,
    setImageUrl: (imageUrl: string) => void,
    setUsername: (username: string) => void
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
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

const initialUserData: UserData = {
    wallet: '',
    imageUrl: '',
    username: '',
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

    const setWallet = (wallet: string) => {
        setUserData(prevUserData => ({ ...prevUserData, wallet }));
    };

    const setImageUrl = (imageUrl: string) => {
        setUserData(prevUserData => ({ ...prevUserData, imageUrl }));
    };

    const setUsername = (username: string) => {
        setUserData(prevUserData => ({ ...prevUserData, username }));
    };

    const contextValue = {
        ...userData,
        setWallet,
        setImageUrl,
        setUsername
    };

    return (
        <UserDataContext.Provider value={contextValue}>
            {children}
        </UserDataContext.Provider>
    );
}
