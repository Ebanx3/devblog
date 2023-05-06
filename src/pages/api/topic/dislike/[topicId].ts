import { addOrRemoveDislike } from '@/db/controllers/topic';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'PUT': {
            return addOrRemoveDislike(req, res);
        }

        default: {
            return res.status(400).json({
                message: 'Undefined Path'
            })
        }
    }
}
