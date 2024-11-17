import {
  type SQL,
  type TableRelationalConfig,
  and,
  eq,
  ilike,
} from "drizzle-orm";
import { type Static, type TSchema, t } from "elysia";

export enum Order {
  ASC = "asc",
  DESC = "desc",
}

export type Query<T> = {
  page?: number;
  limit?: number;
  filter?: Partial<T>;
  sort?: keyof T;
  order?: "asc" | "desc";
};

export const queryGenericSchema = t.Object({
  page: t.Optional(t.Number()),
  limit: t.Optional(t.Number()),
  sort: t.Optional(t.String()),
  order: t.Optional(t.Enum(Order)),
});

export type GenericQuery = Static<typeof queryGenericSchema>;

export const filtersWithQuerySchema = <T extends TSchema>(schema: T) =>
  t.Composite([queryGenericSchema, schema]);

export const buildQuery = <Return extends Query<unknown>, T>({
  page,
  limit,
  sort,
  order,
  ...rest
}: GenericQuery & T): Return =>
  ({
    page,
    limit,
    sort: sort as keyof T,
    order,
    filter: rest as Partial<T>,
  }) as unknown as Return;

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
