import { emailSchema, namesSchema, updatePasswordSchema } from "@/schemas/user";
import * as z from "zod";

export type namesSchemaType = z.infer<typeof namesSchema>;
export type emailSchemaType = z.infer<typeof emailSchema>;
export type updatePasswordSchemaType = z.infer<typeof updatePasswordSchema>;
