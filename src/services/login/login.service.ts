import { AppDataSource } from "../../data-source";
import { Employees } from "../../entities/employees.entity";
import { ILoginEmployeeRequest } from "../../interfaces/login";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/appError";

export const loginService = async ({ name, password }: ILoginEmployeeRequest) => {
  const employeeRepository = AppDataSource.getRepository(Employees);

  const employee = await employeeRepository.findOneBy({
    name: name,
  });

  if (!employee) {
    throw new AppError(401, "invalid user or password");
  }

  const passwordMatch = await compare(password, employee.password);

  if (!passwordMatch) {
    throw new AppError(401, "invalid user or password");
  }

  const token = jwt.sign(
    {
      isAdm: employee.isAdm,
      id: employee.id,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
    }
  );
  return token;
};
