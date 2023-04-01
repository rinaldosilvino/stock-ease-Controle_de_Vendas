import { Request, Response } from "express";
import { createUserService } from "../../services/users/createUser.service";

export const createUserController = async (req: Request, res: Response) => {
	const { name, password, is_adm, is_active } = req.body;

	const user = await createUserService({ name, password, is_adm, is_active });

	return res.status(201).send(user);
};
