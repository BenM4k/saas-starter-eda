import z from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character",
  );

export const signUpSchema = z
  .object({
    emailAddress: z.email(),
    firstName: z.string().min(2, "add a valid name"),
    lastName: z.string().min(2, "Add a valid name"),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  emailAddress: z.email(),
  password: z.string().min(8, "password must have 8 chars at least"),
});

export const verifyCodeSchema = z.object({
  code: z.string().min(4, "invalid code"),
});
