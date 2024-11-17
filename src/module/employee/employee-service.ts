import { eq, sql } from "drizzle-orm";

import { db } from "@/db";
import {
  type CreateEmployee,
  type SelectEmployee,
  type SelectEmployeeById,
  employee,
} from "@/db/schema";
import type { Query } from "@/lib/query";
import { buildSQLQueryConfig } from "@/lib/query/buildSQLQueryConfig";

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
    db
      .update(employee)
      .set({ deletedAt: sql`now()` })
      .where(eq(employee.id, id))
      .returning()
      .execute(),
};
