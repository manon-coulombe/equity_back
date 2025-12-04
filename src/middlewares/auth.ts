import {NextFunction, Request, RequestHandler, Response} from "express";
import admin from "firebase-admin";

export const verifyFirebaseToken: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "Missing or invalid Authorization header" });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = await admin.auth().verifyIdToken(token);
        // @ts-ignore
        req.user = { uid: decoded.uid };
        next();
    } catch (err) {
        res.status(403).json({ error: "Invalid token" });
        return;
    }
};
