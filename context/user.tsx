"use client"

import { createContext, useContext, useState } from "react";
import { CrowdHelp, FiftyFifty, PhoneCall, Refresh, SecondChance } from "./hint-actions";
import { questions_table } from "@prisma/client";

export type Hint = {
    id: number
    img: string
    effect: Function
    selected: boolean
    available: boolean
}

export type UserInfo = {
    name: string
    setName: (value: string) => string
    hints: Hint[]
    setHints: (value: Hint[]) => Hint[]
    question: questions_table
    setQuestion: (value: questions_table | undefined) => questions_table | undefined
}

export const hintsArray = [
    {
        id: 1,
        img: '/icons/50-percent.png',
        effect: FiftyFifty,
        selected: false,
        available: true
    },
    {
        id: 2,
        img: '/icons/crowd-help.png',
        effect: CrowdHelp,
        selected: false,
        available: true
    },
    {
        id: 3,
        img: '/icons/phone-call.png',
        effect: PhoneCall,
        selected: false,
        available: true
    },
    {
        id: 4,
        img: '/icons/refresh.png',
        effect: Refresh,
        selected: false,
        available: true
    },
    {
        id: 5,
        img: '/icons/second-chance.png',
        effect: SecondChance,
        selected: false,
        available: true
    },
]

export const UserContext = createContext({});

export function useUserContext() {
  return useContext(UserContext) as UserInfo;
}

interface UserContextProvider {
    children: React.ReactNode;
}

export default function UserContextProvider({ children }: UserContextProvider) {
    const [name, setName] = useState<string>('')            // тут можно заюзать localStorage, но это странно
    const [hints, setHints] = useState<Hint[]>(hintsArray)  // тут можно заюзать localStorage, но это странно
    const [question, setQuestion] = useState<questions_table | undefined>()

    return (
        <UserContext.Provider value={ {name, setName, hints, setHints, question, setQuestion} }>
            {children}
        </UserContext.Provider>
    );
}
