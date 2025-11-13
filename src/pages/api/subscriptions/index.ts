import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const subscriptions = await prisma.subscription.findMany({
      include: { product: { include: { rentalPlans: true } } }
    });
    return res.status(200).json(subscriptions);
  }

  res.status(405).json({ message: 'Method not allowed' });
}