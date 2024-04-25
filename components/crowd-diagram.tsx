"use client"

import React from 'react'
import { Separator } from './ui/separator'
import { useUserContext } from '@/context/user';

function randomIntFromInterval(min: number, max: number) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generatePercents(right_answer: number){
    let remainder = 100

    const right_answer_percent = randomIntFromInterval(51, remainder)
    remainder -= right_answer_percent
    const wrong_answer_1_percent = randomIntFromInterval(0, remainder)
    remainder -= wrong_answer_1_percent
    const wrong_answer_2_percent = randomIntFromInterval(0, remainder)
    remainder -= wrong_answer_2_percent
    const wrong_answer_3_percent = remainder

    let out = [wrong_answer_1_percent, wrong_answer_2_percent, wrong_answer_3_percent]
    out.splice(right_answer - 1, 0, right_answer_percent)

    return out
}

const CrowdDiagram = () => {
    const { question } = useUserContext()

    const percents = generatePercents(question.right_answer)

    const divStyle1 = {
        width: '25%',               // Пример значения ширины
        height: percents[0] + '%',  // Значение высоты
        backgroundColor: 'red'      // Пример цвета фона
    };

    const divStyle2 = {
        width: '25%',               // Пример значения ширины
        height: percents[1] + '%',  // Значение высоты
        backgroundColor: 'lightblue'      // Пример цвета фона
    };

    const divStyle3 = {
        width: '25%',               // Пример значения ширины
        height: percents[2] + '%',  // Значение высоты
        backgroundColor: 'lightgreen'      // Пример цвета фона
    };

    const divStyle4 = {
        width: '25%',               // Пример значения ширины
        height: percents[3] + '%',  // Значение высоты
        backgroundColor: 'lightpink'      // Пример цвета фона
    };

    return (
        <section className='flex bg-white h-[300px] w-full p-6 flex-col gap-y-3 text-center rounded-[14px] border shadow-md'>
            <h1 className='font-bold text-xl'>Голосование зрителей</h1>
            <Separator className='w-full bg-gray-300'/>
            <div className='flex flex-row gap-x-2 h-full items-end'>
                <div className='border-black border shadow rounded-[4px]' style={divStyle1}>
                    {percents[0]+'%'}
                </div>
                <div className='border-black border shadow rounded-[4px]' style={divStyle2}>
                    {percents[1]+'%'}
                </div>
                <div className='border-black border shadow rounded-[4px]' style={divStyle3}>
                    {percents[2]+'%'}
                </div>
                <div className='border-black border shadow rounded-[4px]' style={divStyle4}>
                    {percents[3]+'%'}
                </div>
            </div>
            <Separator className='w-full bg-gray-300 mt-6' />
            <div className='flex flex-row gap-x-2 text-xl'>
                <div className='w-1/4'>1</div>
                <div className='w-1/4'>2</div>
                <div className='w-1/4'>3</div>
                <div className='w-1/4'>4</div>
            </div>
        </section>
    )
}

export default CrowdDiagram
