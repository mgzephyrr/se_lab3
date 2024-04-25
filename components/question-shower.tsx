"use client"

import axios from 'axios'
import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { prize } from '@/constants'
import { useUserContext } from '@/context/user'
import CrowdDiagram from './crowd-diagram'
import { FriendNumberForm } from './friend-number-form'

const QuestionShower = ({
    level
} : {
    level: number
}) => {
    const { name, question, setQuestion } = useUserContext()
    const router = useRouter()

    const correctAudio = document.getElementById("correct") as HTMLAudioElement

    useEffect(() => {
        axios.post('/api/random_question', {
            level: level
        })
        .then((data) => {
            setQuestion(data.data['question'])
        })
        .catch((e) => {
            console.log(e.message)
        })

        if (correctAudio && level !== 1)
            correctAudio.play()
    }, [])

    const onSubmit = (answer: number) => {
        const value = Number(level)
        console.log((document.getElementById("second_chance_handler") as HTMLDivElement).style.display)

        if (answer === question?.right_answer){
            (document.getElementById("second_chance_handler") as HTMLDivElement).style.display = ''

            if (value === 15){
                router.push('/win')
                axios.post('/api/create', {
                    name: name,
                    score: 3000000
                });

                return;
            }
            router.push('/question/' + (value + 1));
            return;
        }

        if ((document.getElementById("second_chance_handler") as HTMLDivElement).style.display !== ''){
            (document.getElementById('answer_' + answer) as HTMLButtonElement).disabled = true;
            (document.getElementById("second_chance_handler") as HTMLDivElement).style.display = ''

            return;
        }

        router.push('/lose/' + value)
        axios.post('/api/create', {
          name: name,
          score: prize[value - 1]
        })
    }

    if (!question)
        return;

    return (
        <div className='flex flex-col justify-between'>
            <div
                className='hidden'
                id='crowd_diagram'
            >
                <CrowdDiagram />
            </div>

            <div
                className='hidden'
                id='type_number'
            >
                <FriendNumberForm />
            </div>

            <div
                className='hidden bg-white w-fit p-6 flex-col gap-y-3 text-center rounded-[14px] border shadow-md font-semibold self-center'
                id='second_chance_handler'
            >
                У вас есть право на ошибку!
            </div>

            <div className='bg-white rounded-[14px] border border-gray-300 shadow text-4xl font-bold w-[800px] text-center p-6'>
                {question.Question}
                {}
            </div>
            <div className='flex flex-col w-full gap-y-2'>
                <div className='flex w-full gap-x-2'>
                    <Button
                        className='w-1/2 rounded-full text-xl border border-white bg-indigo-600 hover:bg-sky-300 hover:text-black'
                        id={'answer_1'}
                        onClick={() => onSubmit(1)}
                    >
                        {question.answer_1}
                    </Button>
                    <Button
                        id={'answer_2'}
                        className='w-1/2 rounded-full text-xl border border-white bg-indigo-600 hover:bg-sky-300 hover:text-black'
                        onClick={() => onSubmit(2)}
                    >
                        {question.answer_2}
                    </Button>
                </div>
                <div className='flex w-full gap-x-2'>
                    <Button
                        id={'answer_3'}
                        className='w-1/2 rounded-full text-xl border border-white bg-indigo-600 hover:bg-sky-300 hover:text-black'
                        onClick={() => onSubmit(3)}
                    >
                        {question.answer_3}
                    </Button>
                    <Button
                        id={'answer_4'}
                        className='w-1/2 rounded-full text-xl border border-white bg-indigo-600 hover:bg-sky-300 hover:text-black'
                        onClick={() => onSubmit(4)}
                    >
                        {question.answer_4}
                    </Button>
                </div>
            </div>
        </div>

  )
}

export default QuestionShower
