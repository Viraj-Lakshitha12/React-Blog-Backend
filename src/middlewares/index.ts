import jwt, {Secret} from "jsonwebtoken";
import express from "express";

//Token verify
export const verifyToken = (req: express.Request, res: any, next: express.NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json("Invalid token");
    }
    try {
        const data: any = jwt.verify(token, process.env.SECRET_KEY as Secret);
        res.tokenData = data;
        next();
    } catch (error) {
        console.error('Token Verification Error:', error);
        return res.status(401).json('Invalid token');
    }


}
