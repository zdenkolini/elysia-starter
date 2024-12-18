import Elysia from "elysia";

import { createEmployee, selectEmployee } from "@/db/schema";
import { buildQuery } from "@/lib/query/buildQuery";
import { filtersWithQuerySchema } from "@/lib/query/filtersWithQuerySchema";
import { employeeService } from "@/module/employee/employee-service";

export const employeeRouter = new Elysia({
  prefix: "/employee",
})
  .get(
    "/",
    async (ctx) => {
      return employeeService.find(buildQuery(ctx.query));
    },
    {
      query: filtersWithQuerySchema(selectEmployee),
    },
  )
  .post(
    "/",
    async (ctx) => {
      return employeeService.create(ctx.body);
    },
    {
      body: createEmployee,
    },
  )
  .get("/:id", async (ctx) => {
    const employee = await employeeService.findById(ctx.params.id);

    if (!employee) {
      ctx.set.status = 404;
    }

    return employee;
  })
  .delete("/:id", async (ctx) => {
    const [deletedEmployee] = await employeeService.delete(ctx.params.id);

    if (!deletedEmployee) {
      ctx.set.status = 404;
    }

    return deletedEmployee;
  });
