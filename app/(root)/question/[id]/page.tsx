import HintsShower from '@/components/hints-shower'
import QuestionShower from '@/components/question-shower'
import ScoreShower from '@/components/score-shower'
import React from 'react'

const QuestionPage = ({params}: {params: {id: number}}) => {
  return (
    <div className='flex flex-row gap-x-20'>
      <audio id="50-50" src="/sounds/50-50.mp3"></audio>
      <audio id="correct" src="/sounds/correct-answer.mp3"></audio>
      <audio id="wrong" src="/sounds/wrong-answer.mp3"></audio>

      <QuestionShower level={params.id}/>
      <ScoreShower index={params.id}/>
      <HintsShower />
    </div>
  )
}

export default QuestionPage
