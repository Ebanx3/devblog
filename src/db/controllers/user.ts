import UserModel from "../models/users";
import { NextApiRequest, NextApiResponse } from "next";
import { checkAuth } from "@/auth";
import { isValidObjectId } from "mongoose";

type response = {
    success: boolean,
    message: string,
    data: object | null
}

const addPostToFavs = async (req: NextApiRequest, res: NextApiResponse<response>) => {
    try {
        const { tokenAuth } = req.cookies;
        const { userId } = checkAuth(tokenAuth!)
        if (!tokenAuth || !userId) {
            return res.status(401).json({ success: false, message: "Unauthorized", data: null })
        }

        const { author, title, date, topicId } = req.body;
        if (!author || !title || !date || !topicId) {
            return res.status(400).json({ success: false, message: "Body must have author, title, date, and topicId", data: null })
        }

        const exists = await UserModel.findById(userId);
        let userUpdated;
        const index = exists.favs.findIndex((elem: any) => elem.topicId === topicId)
        if (index >= 0) {
            const newArray = exists.favs;
            newArray.splice(index, 1)
            userUpdated = await UserModel.findByIdAndUpdate(userId, { favs: newArray }, { new: true })
        }
        else {
            const newArray = [...exists.favs];
            newArray.push({ author, title, date, topicId })
            userUpdated = await UserModel.findByIdAndUpdate(userId, { favs: newArray }, { new: true })
        }


        return res.status(200).json({
            success: true,
            message: "ok",
            data: { username: userUpdated.username, favs: userUpdated.favs }
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error trying to get the topics',
            data: null
        })
    }
}

export { addPostToFavs }