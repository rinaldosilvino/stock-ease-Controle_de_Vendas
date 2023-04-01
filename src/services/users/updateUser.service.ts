import { AppDataSource } from "../../data-source";
import { Employees } from "../../entities/employees.entity";
import { AppError } from "../../errors/appError";
import { IEmployeeUpdate } from "../../interfaces/employees";
import bcrypt from "bcrypt";

export const updateUserService = async (userId: number, { password }: IEmployeeUpdate) => {
	const userRepository = AppDataSource.getRepository(Employees);
	const findUser = await userRepository.findOneBy({ id: userId });

	if (!findUser) {
		throw new AppError(404, "Can't found user");
	}

	await userRepository.update(userId, {
		password: password ? await bcrypt.hash(password, 10) : findUser.password,
	});

	const user = await userRepository.findOneBy({ id: userId });
	const { id, name, isActive, isAdm } = user!;

	return { id, name, isActive, isAdm };
};
