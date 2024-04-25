import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try{
        const data = await prisma.users.findMany()
        res.status(200).json({ users: data })
    }
    catch(e){
        res.status(405).json({ error: e })
    }

  } else {
    res.status(501).json({ error: "Not implemented" })
  }
}
