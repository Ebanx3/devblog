import { NextApiRequest, NextApiResponse } from "next";
import { checkAuth, setAuthTokenNull } from "@/auth";
import { response } from "@/types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<response>
) {
    try {
        if (req.method != "POST")
            return res.status(404).json({ success: false, message: "Undefined path", data: null });

        const token = req.cookies.tokenAuth;

        if (!token || !checkAuth(token)) return res.status(401).json({ success: false, message: "Token doesn´t exists", data: null })

        return res.status(200).setHeader("Set-Cookie", setAuthTokenNull()).json({
            success: true,
            message: "logout succesfully",
            data: null
        })

    } catch (error) {

        return res
            .status(500)
            .json({ success: false, message: "Error trying to login", data: error as object });
    }
}
