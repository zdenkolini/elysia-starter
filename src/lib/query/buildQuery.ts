import type { GenericQuery, Query } from "@/lib/query";

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
