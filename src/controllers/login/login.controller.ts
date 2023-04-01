import { Request, Response } from "express";
import { loginService } from "../../services/login/login.service";

export const loginController = async (req: Request, res: Response) => {
  const { name, password } = req.body;
  const token = await loginService({ name, password });
  return res.status(200).json({ token });
};
