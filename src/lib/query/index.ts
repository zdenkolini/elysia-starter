import { type Static, t } from "elysia";

export enum Order {
  ASC = "asc",
  DESC = "desc",
}

export type Query<T> = {
  page?: number;
  limit?: number;
  filter?: Partial<T>;
  sort?: keyof T;
  order?: Order;
};

export const queryGenericSchema = t.Object({
  page: t.Optional(t.Number()),
  limit: t.Optional(t.Number()),
  sort: t.Optional(t.String()),
  order: t.Optional(t.Enum(Order)),
});

export type GenericQuery = Static<typeof queryGenericSchema>;
