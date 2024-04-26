"use client"

import { CardWrapper } from '@/components/card-wrapper'
import { prize } from '@/constants';
import { useUserContext } from '@/context/user';
import React, { useEffect, useState } from 'react'

const LosePage = ({params}: {params: {id: number}}) => {
  const { name } = useUserContext()
  const wrongAudio = document.getElementById("wrong") as HTMLAudioElement;

  useEffect(() => {
    setTimeout(() => {wrongAudio?.play()}, 100)
  }, [])


  return (
    <CardWrapper
      headerLabel='Вы проиграли!'
      backButtonLabel='Попробовать еще раз'
      backButtonHref='/'
    >
      <h1 className='text-center text-xl'>{name}, к сожалению, вы проиграли. Ваш выигрыш составил: {prize[params.id - 1]}.</h1>
    </CardWrapper>
  )
}

export default LosePage
