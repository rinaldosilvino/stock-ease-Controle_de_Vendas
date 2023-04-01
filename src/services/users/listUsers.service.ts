import { AppDataSource } from "../../data-source";
import { Employees } from "../../entities/employees.entity";

export const listUserService = async () => {
	const userRepository = AppDataSource.getRepository(Employees);
	const users = await userRepository.find({
		select: { id: true, name: true, isActive: true, isAdm: true, updatedAt: true, createdAt: true },
	});

	return users;
};
