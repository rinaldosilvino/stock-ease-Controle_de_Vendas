import { Employees } from "../../entities/employees.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { IEmployeeRequest } from "../../interfaces/employees";
import bcrypt from "bcrypt";

export const createUserService = async ({ name, password, is_adm }: IEmployeeRequest) => {
  const userRepository = AppDataSource.getRepository(Employees);
  const users = await userRepository.find();

  const nameAlreadyExists = users.find((user) => user.name === name);

  if (nameAlreadyExists) {
    throw new AppError(400, "Name Already Exists");
  }

  const passwordHash = bcrypt.hashSync(password, 10);

  const user = new Employees();

  user.name = name;
  user.password = passwordHash;
  user.isAdm = is_adm;

  userRepository.create(user);
  await userRepository.save(user);

  const returnUser = {
    id: user.id,
    name: user.name,
    isAdm: user.isAdm,
    is_active: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return returnUser;
};
