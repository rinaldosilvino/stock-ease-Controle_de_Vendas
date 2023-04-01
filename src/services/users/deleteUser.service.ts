import { AppDataSource } from "../../data-source";
import { Employees } from "../../entities/employees.entity";
import { AppError } from "../../errors/appError";

export const deleteUserService = async (id: number) => {
	const userRepository = AppDataSource.getRepository(Employees);
	const user = await userRepository.findOneBy({ id });

	if (!user) {
		throw new AppError(404, "User not found");
	}

	if (user.isActive === false) {
		throw new AppError(400, "Can't delete");
	}

	user.isActive = false;

	await userRepository.save(user);

	return;
};
