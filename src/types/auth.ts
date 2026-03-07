import * as z from "zod";
import { signUpSchema, signInSchema, verifyCodeSchema } from "@/schemas/auth";

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
export type SignInSchemaType = z.infer<typeof signInSchema>;
export type verifyCodeSchemaType = z.infer<typeof verifyCodeSchema>;
