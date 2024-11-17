import { createId } from "@paralleldrive/cuid2";
import { char, date, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { type Static, t } from "elysia";

import { timestampKeys, timestamps } from "@/db/timestamps";

export const employee = pgTable("employee", {
  id: char("id", {
    length: 24,
  })
    .primaryKey()
    .$defaultFn(createId),
  name: varchar("name"),
  email: varchar("email"),
  age: integer("age"),
  dateOfBirth: date("date_of_birth"),
  ...timestamps,
});

const omitKeys = ["id", ...timestampKeys] as const;

const _createEmployee = createInsertSchema(employee);
const _selectEmployee = createSelectSchema(employee);

export const createEmployee = t.Omit(_createEmployee, omitKeys);
export const selectEmployee = t.Partial(t.Omit(_selectEmployee, omitKeys));
export const selectEmployeeById = _selectEmployee.properties.id;

export type Employee = typeof employee.$inferSelect;
export type CreateEmployee = Static<typeof createEmployee>;
export type SelectEmployee = Static<typeof selectEmployee>;
export type SelectEmployeeById = Static<typeof selectEmployeeById>;
