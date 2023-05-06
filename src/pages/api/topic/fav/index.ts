import { addPostToFavs } from '@/db/controllers/user';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'PUT': {
            return addPostToFavs(req, res)
        }
        default: {
            return res.status(400).json({
                message: 'Undefined Path'
            })
        }
    }
}
