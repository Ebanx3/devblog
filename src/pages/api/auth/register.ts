import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "@/db/models/users";
import { response } from "@/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse<response>) {

    try {
        if (req.method != 'POST') return res.status(404).json({ success: false, message: 'Undefined path', data: null })

        const { username, password, email } = req.body;

        if (!username || !password || !email) return res.status(400).json({ success: false, message: 'Must have username, password and email fields', data: null })

        const query = { $or: [{ username: username }, { email: email }] };

        const user = await UserModel.findOne(query);

        if (user) return res.status(400).json({ success: false, message: 'username or email already in use', data: null });

        const userData = { username, email, password, favs: [] };

        await UserModel.create(userData);

        return res.status(200).json({ success: true, message: 'ok', data: null })

    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Error trying to register', data: error as object })
    }


}