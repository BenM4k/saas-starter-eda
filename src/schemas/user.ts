import * as z from "zod";
import { passwordSchema } from "./auth";

export const namesSchema = z.object({
  firstName: z.string().min(2, "Name should have 2 characters at least"),
  lastName: z.string().min(2, "Last name should have 2 characters at least"),
});

export const emailSchema = z.object({
  emailAddress: z.email("Invalid email address"),
});

export const updatePasswordSchema = z
  .object({
    currentPwd: passwordSchema,
    newPwd: passwordSchema,
    confirmNewPwd: passwordSchema,
  })
  .refine((data) => data.newPwd === data.confirmNewPwd, {
    message: "Passwords do not match",
    path: ["confirmNewPwd"],
  })
  .refine((data) => data.currentPwd !== data.newPwd, {
    message: "Cant update to the same password",
    path: ["newPwd"],
  });
