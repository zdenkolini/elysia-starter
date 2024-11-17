import {
  type SQL,
  type TableRelationalConfig,
  and,
  eq,
  ilike,
} from "drizzle-orm";

import type { Query } from "@/lib/query";

export const buildSQLQueryConfig = <
  T,
  TTableConfig extends TableRelationalConfig,
>({
  page = 0,
  limit = 10,
  filter,
}: Query<T>) => {
  type Fields = TTableConfig["columns"];
  const whereFilters = (fields: Fields): SQL | undefined =>
    and(
      ...Object.entries(filter ?? {}).map(([column, value]) => {
        const typedColumn = column as keyof Fields;
        const drizzleColumn = fields[typedColumn];

        if (drizzleColumn.dataType === "number") {
          return eq(drizzleColumn, +value!);
        }

        return ilike(drizzleColumn, `%${value!}%`);
      }),
    );

  return {
    limit: limit,
    offset: page * limit,
    where: whereFilters,
  };
};
