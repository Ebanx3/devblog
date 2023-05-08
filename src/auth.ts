import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export const generateAuthToken = (user: any) => {
    const data = {
        username: user.username,
        userId: user._id,
        rol: user.rol,
        urlAvatar: user.urlAvatar
    }

    const token = jwt.sign(data, process.env.TOKEN_SECRET_KEY || '', { expiresIn: '15 days' });

    const serialized = serialize("tokenAuth", token, { httpOnly: true, sameSite: 'strict', maxAge: 1000 * 60 * 60 * 24 * 15, path: '/' })

    return serialized;
}

export const setAuthTokenNull = () => {
    const serialized = serialize("tokenAuth", "", { httpOnly: true, sameSite: 'strict', maxAge: 0, path: '/' });
    return serialized;
}


export const checkAuth = (token: string) => {
    try {
        const tokenData: any = jwt.verify(token, process.env.TOKEN_SECRET_KEY || ' ');
        return { username: tokenData.username, userId: tokenData.userId, rol: tokenData.rol }
    }
    catch (error) {
        return {}
    }

}