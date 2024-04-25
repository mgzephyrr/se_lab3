"use client"

import { CardWrapper } from '@/components/card-wrapper'
import { useUserContext } from '@/context/user'
import React, { useEffect, useState } from 'react'

const WinPage = ({params}: {params: {id: number}}) => {
  const { name } = useUserContext()
  const correctAudio = document.getElementById("correct") as HTMLAudioElement;

  useEffect(() => {
    setTimeout(() => {correctAudio?.play()}, 100)
  }, [])

  return (
    <CardWrapper
      headerLabel='Вы проиграли!'
      backButtonLabel='Попробовать еще раз'
      backButtonHref='/'
    >
      <h1 className='text-center text-xl'>{name}, поздравляем, вы стали миллионером! Ваш выигрыш составил: 3.000.000.</h1>
    </CardWrapper>
  )
}

export default WinPage
