"use client"

import LeaderboardTable from "@/components/leaderboard/leaderboard";
import { CardWrapper } from "./card-wrapper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { users } from "@prisma/client";
import axios from "axios";

export default function Leaderboard() {

    const [data, setData] = useState<users[]>([])
    useEffect(() => {
        axios.get('/api/get_leaderboard')
        .then((data) => {
            setData(data.data['users'])
        })
        .catch((e) => {
            console.log(e.message)
            setData([])
        })
    }, [])

    return (
        <CardWrapper
            headerLabel="Прошлые попытки"
            backButtonHref="/"
            backButtonLabel="Вернуться к вводу имени"
        >
            <LeaderboardTable data={data}/>
        </CardWrapper>
    );
}
