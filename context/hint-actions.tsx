import { questions_table } from "@prisma/client";
import axios from "axios";

function randomIntFromInterval(min: number, max: number) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function FiftyFifty(question: questions_table) {
    const audio = document.getElementById("50-50") as HTMLAudioElement;
    audio.play();

    function GetIndexes(){
        let rndInd1 = randomIntFromInterval(1, 5);
        while (rndInd1 === 5 || rndInd1 === question.right_answer){
            rndInd1 = randomIntFromInterval(1, 5);
        }

        let rndInd2 = randomIntFromInterval(1, 5);
        while (rndInd2 === 5 || rndInd1 === rndInd2 || rndInd2 === question.right_answer){
            rndInd2 = randomIntFromInterval(1, 5);
        }

        return [rndInd1, rndInd2]
    }

    const indexes = GetIndexes()
    console.log(indexes)
    indexes.map(ind => {
        (document.getElementById('answer_' + ind) as HTMLButtonElement).disabled = true
    })
}

export function CrowdHelp(question: questions_table) {
    (document.getElementById("crowd_diagram") as HTMLDivElement).style.display = 'flex'
}

export function PhoneCall(question: questions_table) {
    (document.getElementById("type_number") as HTMLDivElement).style.display = 'flex'
    setTimeout(() => {
        try{
            (document.getElementById("type_number") as HTMLDivElement).style.display = 'none'
        }
        catch(e){}

    }, 15000)
}

export function Refresh(question: questions_table, setQuestion: (value: questions_table | undefined) => questions_table | undefined) {
    console.log('Refresh used')
    axios.post('/api/random_question', {
        level: question.level
    })
    .then((data) => setQuestion(data.data['question']))
}

export function SecondChance(question: questions_table) {
    (document.getElementById("second_chance_handler") as HTMLDivElement).style.display = 'flex'
}
