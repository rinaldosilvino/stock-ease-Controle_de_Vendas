import { Request, Response, NextFunction } from "express";

export const cantUpdateMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	if (req.body.hasOwnProperty("id") || req.body.hasOwnProperty("isActive")) {
		return res.status(401).json({ message: "You are trying to update a protected field." });
	}

	if (req.body.hasOwnProperty("isAdm") && !req.user.isAdm) {
		return res.status(401).json({ message: "You are trying to update a protected field." });
	}
	next();
};
