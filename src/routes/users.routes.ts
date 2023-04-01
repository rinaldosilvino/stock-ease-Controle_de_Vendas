import { Router } from "express";

import { createUserController } from "../controllers/users/createUser.controller";
import { deleteUserController } from "../controllers/users/deleteUser.controller";
import { listUserController } from "../controllers/users/listUsers.controller";
import { updateUserController } from "../controllers/users/updateUser.controller";

import { authAdmMiddleware } from "../middlewares/authAdm.middleware";
import { cantUpdateMiddleware } from "../middlewares/cantUpdateMiddleware";
import { verifyAuthToken } from "../middlewares/verifyAuthToken.middleware";

const routes = Router();

const usersRoutes = () => {
	routes.post("/", createUserController);
	routes.get("", verifyAuthToken, authAdmMiddleware, listUserController);
	routes.delete("/:id", verifyAuthToken, authAdmMiddleware, deleteUserController);
	routes.patch("/:id", verifyAuthToken, cantUpdateMiddleware, updateUserController);

	return routes;
};

export default usersRoutes;
