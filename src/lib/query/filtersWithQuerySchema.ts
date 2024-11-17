import { type TSchema, t } from "elysia";

import { queryGenericSchema } from "@/lib/query";

export const filtersWithQuerySchema = <T extends TSchema>(schema: T) =>
  t.Composite([queryGenericSchema, schema]);
