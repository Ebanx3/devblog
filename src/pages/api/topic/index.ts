import { addReplyToTopic, createTopic, getAllPublicTopics } from '@/db/controllers/topic';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'GET': {
            return getAllPublicTopics(req, res);
        }
        case 'POST': {
            return createTopic(req, res)
        }
        case 'PUT': {
            return addReplyToTopic(req, res)
        }
        default: {
            return res.status(400).json({
                message: 'Undefined Path'
            })
        }
    }
}
