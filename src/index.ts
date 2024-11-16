import { logger } from "@bogeychan/elysia-logger";
import { bearer } from "@elysiajs/bearer";
import { cors } from "@elysiajs/cors";
import { jwt } from "@elysiajs/jwt";
import { serverTiming } from "@elysiajs/server-timing";
import { staticPlugin } from "@elysiajs/static";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";

import { employeeRouter } from "@/module/employee/employee-router";

import { client } from "./db";

const app = new Elysia()
  .use(logger())
  .use(swagger())
  .use(bearer())
  .use(cors())
  .use(jwt({ secret: process.env.JWT_SECRET as string }))
  .use(serverTiming())
  .use(staticPlugin())
  .use(employeeRouter);

await client.connect();
console.log("🗄️ Database was connected!");

app.listen(process.env.PORT as string, () =>
  console.log(`🦊 Server started at ${app.server?.url.origin}`),
);
