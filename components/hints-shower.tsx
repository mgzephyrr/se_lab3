"use client"

import { Hint, useUserContext } from '@/context/user'
import React from 'react'
import { Button } from './ui/button'

const HintsShower = () => {
    const { hints, setHints, question, setQuestion } = useUserContext()

    return (
        <div className='flex h-fit w-full bg-white flex-col p-2 rounded-[14px] items-center gap-y-4'>
            <h1 className='text-center font-bold text-xl'>Подсказки</h1>
            <div className='flex flex-row gap-x-2'>
                {hints.map((hint) => {
                    if (hint.selected){
                        return (
                            <Button
                                key={hint.id}
                                id={'hint' + hint.id}
                                style={{backgroundImage: `url(${hint.img})`}}
                                className='flex w-[80px] h-[80px] bg-cover bg-center border bg-blend-multiply bg-white rounded-full hover:bg-gray-400 border-black hover:border-green-500'
                                disabled={!hint.available}
                                onClick={() => {
                                    hint.effect(question, setQuestion);
                                    (document.getElementById('hint' + hint.id) as HTMLButtonElement).disabled = true
                                    setHints(((prevValue: Hint[]) => ([...prevValue].map(
                                                el => el.id === hint.id ? ({...el, available: false}): el
                                            ))) as unknown as Hint[])
                                }}
                            >

                            </Button>
                        )
                    }
                })}
            </div>

        </div>
    )
}

export default HintsShower
