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
