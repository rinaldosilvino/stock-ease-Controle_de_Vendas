import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const verifyAuthToken = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;
  token = token?.split(" ")[1] || token;

  jwt.verify(token as string, String(process.env.SECRET_KEY) as string, (err: any, decoded: any) => {
    try {
      req.user = { id: decoded.id, isAdm: decoded.isAdm };
      next();
    } catch (error) {
      return res.status(401).json({
        message: err.message,
      });
    }
  });
};  

