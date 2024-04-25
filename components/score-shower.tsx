"use client"

import React, { useEffect, useState } from 'react'
import { Separator } from './ui/separator'
import { prize } from '@/constants'
import { cn } from '@/lib/utils'
import { useUserContext } from '@/context/user'

function ScoreShower({
    index
} : {
    index: number
}) {
    const { name } = useUserContext()
    let count = 0
    return (
        <section className='flex flex-col p-6 bg-white justify-center gap-2 rounded-[14px] border border-gray-300 shadow'>
            <h1 className='text-black text-xl font-bold'>
                {name}
            </h1>
            <Separator className='bg-gray-300 w-full'/>
            <div className='flex flex-1 flex-col gap-3 items-start'>
                {prize.map((number) => {
                    count += 1
                    return (
                        <h2 key={number} className={cn('text-xl font-semibold w-full', {'bg-yellow-300': Number(index) === count})}>{number}</h2>
                    )
                })}
            </div>
        </section>
    )
}

export default ScoreShower
