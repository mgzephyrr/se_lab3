import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try{
        await prisma.users.create({
            data:{
                name: req.body['name'],
                score: req.body['score']
            }
        })

        res.status(200).json({ message: 'Success!' })
    }
    catch(e){
        res.status(405).json({ error: e })
    }

  } else {
    res.status(501).json({ error: "Not implemented" })
  }
}
