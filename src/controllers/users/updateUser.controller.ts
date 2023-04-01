import { Request, Response } from "express";
import { updateUserService } from "../../services/users/updateUser.service";

export const updateUserController = async (req: Request, res: Response) => {
	const id = req.params.id;
	const { password } = req.body;

	const updatedUser = await updateUserService(Number(id), { password });

	return res.status(200).json(updatedUser);
};
