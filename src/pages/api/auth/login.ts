import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "@/db/models/users";
import { generateAuthToken } from "@/auth";
import { response } from "@/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse<response>) {

    try {
        if (req.method != 'POST') return res.status(404).json({ success: false, message: 'Undefined path', data: null })

        const { username, password } = req.body;

        if (!username || !password) return res.status(400).json({ success: false, message: 'Must have a body with username and password fields', data: null })

        const user = await UserModel.findOne({ username });

        if (!user) return res.status(400).json({ success: false, message: 'Invalid username', data: null })

        const isTheSamePass = await user.isValidPassword(password);
        if (!isTheSamePass) return res.status(400).json({ success: false, message: 'Invaild password', data: null })

        const token = generateAuthToken(user);

        return res.status(200).setHeader('Set-Cookie', token).json({ success: true, message: 'ok', data: { username: user.username, userId: user._id, rol: user.rol, urlAvatar: user.urlAvatar, favs: user.favs } })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Error trying to login', data: error as object })
    }


}