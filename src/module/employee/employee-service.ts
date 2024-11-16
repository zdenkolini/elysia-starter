import { db } from "@/db";
import {
  type CreateEmployee,
  type SelectEmployee,
  type SelectEmployeeById,
  employee,
} from "@/db/schema";

export const employeeService = {
  create: (payload: CreateEmployee) => {
    db.insert(employee).values(payload).returning().execute();
  },
  find({ limit = 10, page = 0, filter }: SelectEmployee) {
    return db.query.employee.findMany({
      limit: limit,
      offset: page * limit,
      where: (emp, { ilike, and }) => {
        return and(
          ...Object.entries(filter ?? {})
            .filter((_, value) => !!value)
            .map(([column, value]) =>
              ilike(
                emp[column as keyof SelectEmployee["filter"]],
                `%${value!}%`,
              ),
            ),
        );
      },
    });
  },
  findById(id: SelectEmployeeById) {
    return db.query.employee.findFirst({
      where: (emp, { eq }) => eq(emp.id, id),
    });
  },
};
