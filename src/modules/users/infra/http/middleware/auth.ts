import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import authConfig from "../../../../../config/auth";

import AppError from "../../../../../shared/erros/AppError";

interface ITokenPayload {
    iat: number;
    ext: number;
    sub: string;
    role: string;
}

export default function auth(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("JWT token is missing", 403);
    }

    const [, token] = authHeader.split(" ");

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub, role } = decoded as ITokenPayload;

        request.user = {
            id: sub,
            role
        };

        return next();
    } catch (err) {
        throw new AppError("Invalid JWT token", 403);
    }
}
