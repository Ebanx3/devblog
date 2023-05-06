import TopicModel from "../models/topic";
import PostModel from "../models/posts";
import { NextApiRequest, NextApiResponse } from "next";
import { checkAuth } from "@/auth";
import { isValidObjectId } from "mongoose";
import ReplyModel from "../models/replies";

type response = {
    success: boolean,
    message: string,
    data: object | null
}

const getAllPublicTopics = async (req: NextApiRequest, res: NextApiResponse<response>) => {
    try {
        const response = await TopicModel.find({ status: "public" });
        return res.status(200).json({
            success: true,
            message: "ok",
            data: response
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

const getMyTopics = async (req: NextApiRequest, res: NextApiResponse<response>) => {
    try {
        const { tokenAuth } = req.cookies;
        const { username } = checkAuth(tokenAuth!)
        if (!tokenAuth || !username) {
            return res.status(401).json({ success: false, message: "Unauthorized", data: null })
        }
        const response = await TopicModel.find({ username });
        return res.status(200).json({
            success: true,
            message: "ok",
            data: response
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

const createTopic = async (req: NextApiRequest, res: NextApiResponse<response>) => {
    try {
        const { tokenAuth } = req.cookies;
        const { username } = checkAuth(tokenAuth!)
        if (!tokenAuth || !username) {
            return res.status(401).json({ success: false, message: "Unauthorized", data: null })
        }

        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ success: false, message: "Body must have title and content", data: null })
        }

        const newPost = await PostModel.create({ username, content });

        const newTopic = await TopicModel.create({ username, title, postId: newPost._id.toString(), replies: [], likes: [], dislikes: [] })
        await PostModel.findByIdAndUpdate(newPost._id, { topicId: newTopic._id })

        return res.status(200).json({
            success: true,
            message: "ok",
            data: newTopic
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

const addReplyToTopic = async (req: NextApiRequest, res: NextApiResponse<response>) => {
    try {
        const { tokenAuth } = req.cookies;
        const { username } = checkAuth(tokenAuth!)
        if (!tokenAuth || !username) {
            return res.status(401).json({ success: false, message: "Unauthorized", data: null })
        }

        const { content, topicId } = req.body;
        if (!content || !topicId) {
            return res.status(400).json({ success: false, message: "Body must have content and topicId", data: null })
        }

        const topic = await TopicModel.findById(topicId);
        if (!topic) return res.status(400).json({ success: false, message: "Does not exists a topic with that id o topicId is not valid", data: null })

        const newReply = await ReplyModel.create({ username, content, topicId });


        const newReplies = [...topic.replies];
        newReplies.push(newReply._id);

        await TopicModel.findByIdAndUpdate(topicId, { replies: newReplies });

        return res.status(200).json({
            success: true,
            message: "Reply added to topic",
            data: newReply
        })
    }
    catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Error trying to get the topics',
            data: error.message
        })
    }
}

const addOrRemoveLike = async (req: NextApiRequest, res: NextApiResponse<response>) => {
    try {
        const { tokenAuth } = req.cookies;
        const { userId } = checkAuth(tokenAuth!)
        if (!tokenAuth || !userId) {
            return res.status(401).json({ success: false, message: "Unauthorized", data: null })
        }

        const { topicId } = req.query;
        if (!topicId || !isValidObjectId(topicId)) {
            return res.status(400).json({ success: false, message: "Invalid id", data: null })
        }

        const exists = await TopicModel.findById(topicId);
        if (!exists) {
            return res.status(400).json({ success: false, message: "Does not exists a Topic with this id", data: null })
        }
        let topicUpdated;
        if (exists.likes.includes(userId)) {
            const newArray = exists.likes.filter((elem: string) => elem !== userId)
            topicUpdated = await TopicModel.findByIdAndUpdate(topicId, { likes: newArray }, { new: true })
        }
        else {
            const newArray: [String] = exists.likes;
            newArray.push(userId.toString())
            topicUpdated = await TopicModel.findByIdAndUpdate(topicId, { likes: newArray }, { new: true })
        }


        return res.status(200).json({
            success: true,
            message: "ok",
            data: topicUpdated.likes.length
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Error trying to update the topic',
            data: null
        })
    }
}

const addOrRemoveDislike = async (req: NextApiRequest, res: NextApiResponse<response>) => {
    try {
        const { tokenAuth } = req.cookies;
        const { userId } = checkAuth(tokenAuth!)
        if (!tokenAuth || !userId) {
            return res.status(401).json({ success: false, message: "Unauthorized", data: null })
        }

        const { topicId } = req.query;
        if (!topicId || !isValidObjectId(topicId)) {
            return res.status(400).json({ success: false, message: "Invalid id", data: null })
        }

        const exists = await TopicModel.findById(topicId);
        if (!exists) {
            return res.status(400).json({ success: false, message: "Does not exists a Topic with this id", data: null })
        }

        let topicUpdated;
        if (exists.dislikes.includes(userId)) {
            const newArray = exists.dislikes.filter((elem: string) => elem !== userId)
            topicUpdated = await TopicModel.findByIdAndUpdate(topicId, { dislikes: newArray }, { new: true })
        }
        else {
            const newArray: [String] = exists.dislikes;
            newArray.push(userId.toString())
            topicUpdated = await TopicModel.findByIdAndUpdate(topicId, { dislikes: newArray }, { new: true })
        }


        return res.status(200).json({
            success: true,
            message: "ok",
            data: topicUpdated.dislikes.length
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Error trying to update the topic',
            data: null
        })
    }
}

const searchInTopics = async (req: NextApiRequest, res: NextApiResponse<response>) => {
    try {
        const { query } = req.query;
        const s: String = query?.toString() || "";
        const wordsInQuery = s.split("&");
        // const q = "/" + wordsInQuery.join("/i,/") + "/i";
        let b: any;
        const a = wordsInQuery.map((elem: String) => {
            b += /elem/i
        })
        console.log(b)
        // const response = await TopicModel.find({ title: { $regex: wordsInQuery[0] } })
        const response = await TopicModel.find({ title: { $in: [/probando/i] } })
        // const arr: any[] = [...response];
        // arr.filter((elem: any) => {

        // })

        return res.status(200).json({
            success: true,
            message: "ok",
            data: response
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Error trying to get the topics',
            data: null
        })
    }
}

const updateTopic = async (req: NextApiRequest, res: NextApiResponse<response>) => {
    try {
        const { tokenAuth } = req.cookies;
        const { username } = checkAuth(tokenAuth!)
        if (!tokenAuth || !username) {
            return res.status(401).json({ success: false, message: "Unauthorized", data: null })
        }
        const { topicId } = req.query;
        const { content } = req.body;
        if (!content || !topicId) {
            return res.status(400).json({ success: false, message: "Body must have content", data: null })
        }

        const topic = await TopicModel.findById(topicId);
        if (!topic) return res.status(400).json({ success: false, message: "Does not exists a topic with that id o topicId is not valid", data: null })

        const post = await PostModel.findByIdAndUpdate(topic.postId, { content })

        await TopicModel.findByIdAndUpdate()

        return res.status(200).json({
            success: true,
            message: " topic updated",
            data: post
        })
    }
    catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Error trying to gupdate the topics',
            data: error.message
        })
    }
}

export { getAllPublicTopics, getMyTopics, createTopic, addOrRemoveLike, addOrRemoveDislike, searchInTopics, addReplyToTopic, updateTopic }