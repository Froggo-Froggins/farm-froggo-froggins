'use client'
import { ReactNode, createContext, useContext, useState } from "react";
import { ITask } from "../components/tasks/Tasks";

export interface UserDataContextType {
    wallet: string,
    imageUrl: string,
    username: string,
    inputedReferralCode: string,
    points: Points,
    tasks: ITask[],
    finishedTasks: number[],
    userReferrerCode: string,
    setTasks: (tasks: ITask[]) => void,
    setWallet: (wallet: string) => void,
    setImageUrl: (imageUrl: string) => void,
    setUsername: (username: string) => void,
    setInputedReferralCode: (input: string) => void,
    setPoints: (points: Points) => void,
    setUserFinishedTasks: (tasks: number[]) => void,
    setUserReferrerCode: (referrerCode: string) => void
}

interface Points {
    total: number,
    referrals: number,
    referralsPoints: number
}

interface UserData {
    wallet: string,
    imageUrl: string,
    username: string,
    inputedReferralCode: string,
    finishedTasks: number[],
    userReferrerCode: string
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

const initialUserData: UserData = {
    wallet: '',
    imageUrl: '',
    username: '',
    inputedReferralCode: '',
    finishedTasks: [],
    userReferrerCode: ''
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
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [finishedTasks, setFinishedTasks] = useState<number[]>([]);

    const setWallet = (wallet: string) => {
        setUserData(prevUserData => ({ ...prevUserData, wallet }));
    };

    const setImageUrl = (imageUrl: string) => {
        setUserData(prevUserData => ({ ...prevUserData, imageUrl }));
    };

    const setUsername = (username: string) => {
        setUserData(prevUserData => ({ ...prevUserData, username }));
    };

    const setUserFinishedTasks = (finishedTasks: number[]) => {
        setUserData(prevUserData => ({ ...prevUserData, finishedTasks }));
    }

    const setInputedReferralCode = (inputedReferralCode: string) => {
        setUserData(prevUserData => ({ ...prevUserData, inputedReferralCode }));
    };

    const setUserReferrerCode = (userReferrerCode: string) => {
        setUserData(prevUserData => ({ ...prevUserData, userReferrerCode }));
    };

    const contextValue = {
        ...userData,
        setWallet,
        setImageUrl,
        setUsername,
        setInputedReferralCode,
        finishedTasks: userData.finishedTasks,
        setUserFinishedTasks,
        points,
        setPoints,
        tasks,
        setTasks,
        setUserReferrerCode
    };

    return (
        <UserDataContext.Provider value={contextValue}>
            {children}
        </UserDataContext.Provider>
    );
}
