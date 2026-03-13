import { createLoader, parseAsStringEnum, UrlKeys } from "nuqs/server";
import { inferParserType } from "nuqs";

const searchParams = {
  taskStatusFilter: parseAsStringEnum([
    "all",
    "pending",
    "in progress",
    "completed",
  ]).withDefault("all"),
};

export type FiltersTypeProps = inferParserType<typeof searchParams>;

const urlKeys: UrlKeys<typeof searchParams> = {
  taskStatusFilter: "status",
};

export const loaderFilters = createLoader(searchParams, { urlKeys });
