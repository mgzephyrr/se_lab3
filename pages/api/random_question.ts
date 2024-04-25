import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try{
        const questions = await prisma.questions_table.findMany({
            where: {
                level: Number(req.body['level'])
            }
        })
        const randomIndex = Math.floor(Math.random() * questions.length);
        const randomQuestion = questions[randomIndex];

        res.status(200).json({ question: randomQuestion })
    }
    catch(e){
        res.status(405).json({ error: e })
    }

  } else {
    res.status(501).json({ error: "Not implemented" })
  }
}
