import {
  createEmployee,
  selectEmployee,
  selectEmployeeById,
} from "@/db/schema";
import { buildQuery, filtersWithQuerySchema } from "@/lib/query";
import { employeeService } from "@/module/employee/employee-service";
import Elysia from "elysia";

export const employeeRouter = new Elysia({
  prefix: "/employee",
})
  .get(
    "/",
    async (ctx) => {
      ctx.set.status = 200;
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
    return employeeService.findById(ctx.params.id);
  });
