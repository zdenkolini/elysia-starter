import { eq } from "drizzle-orm";

import { db } from "@/db";
import {
  type CreateEmployee,
  type SelectEmployee,
  type SelectEmployeeById,
  employee,
} from "@/db/schema";
import { type Query, buildSQLQueryConfig } from "@/lib/query";

export const employeeService = {
  create: (payload: CreateEmployee) =>
    db.insert(employee).values(payload).returning().execute(),
  find: (query: Query<SelectEmployee>) =>
    db.query.employee.findMany(buildSQLQueryConfig(query)),
  findById: (id: SelectEmployeeById) =>
    db.query.employee.findFirst({
      where: (emp, { eq }) => eq(emp.id, id),
    }),
  delete: (id: SelectEmployeeById) =>
    db.delete(employee).where(eq(employee.id, id)).returning().execute(),
};
