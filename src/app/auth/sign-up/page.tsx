"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { useAuth, useSignUp } from "@clerk/nextjs";
import { SignUpSchemaType } from "@/types/auth";
import { signUpSchema } from "@/schemas/auth";
import VerifyCode from "@/components/auth/verify-code";
import { CustomFormField } from "@/components/auth/formfield";
import Link from "next/link";

export default function Page() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      emailAddress: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    const { emailAddress, password, firstName, lastName } = values;

    const { error } = await signUp.password({
      emailAddress,
      password,
      firstName,
      lastName,
    });
    if (error) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    if (!error) await signUp.verifications.sendEmailCode();
  });

  if (signUp.status === "complete" || isSignedIn) {
    return null;
  }

  const missingRequirements = signUp.status === "missing_requirements";
  const unverifiedFields = signUp.unverifiedFields.includes("email_address");
  const missingFields = signUp.missingFields.length === 0;
  const showVerifyCode =
    missingRequirements && unverifiedFields && missingFields;

  if (showVerifyCode) {
    return (
      <VerifyCode errors={errors} fetchStatus={fetchStatus} signUp={signUp} />
    );
  }

  return (
    <>
      <div
        className={cn(
          "w-130 mx-auto h-screen flex flex-col justify-center gap-6",
        )}
      >
        <Card className="p-8 shadow-2xl">
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-xl font-bold">Welcome to My website</h1>
                <FieldDescription>
                  Already have an account?{" "}
                  <Link href="/auth/sign-in">Sign in</Link> or return to{" "}
                  <Link href="/">Home page</Link>
                </FieldDescription>
              </div>
              <CustomFormField
                control={form.control}
                name="emailAddress"
                label="Email"
              />
              <div className="flex flex-col md:flex-row gap-4">
                <CustomFormField
                  control={form.control}
                  name="firstName"
                  label="First Name"
                />
                <CustomFormField
                  control={form.control}
                  name="lastName"
                  label="Last Name"
                />
              </div>
              <CustomFormField
                control={form.control}
                name="password"
                label="Password"
                type="password"
              />
              <CustomFormField
                control={form.control}
                name="confirmPassword"
                label="Confirm Password"
                type="password"
              />
              <Field>
                <Button type="submit" disabled={fetchStatus === "fetching"}>
                  Create Account
                </Button>
              </Field>
            </FieldGroup>
          </form>
          {errors.fields.password && <p>{errors.fields.password.message}</p>}

          <FieldDescription className="px-6 text-center">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </FieldDescription>
        </Card>
      </div>

      {/* Required for sign-up flows. Clerk's bot sign-up protection is enabled by default */}
      <div id="clerk-captcha" />
    </>
  );
}

function Socials() {
  return (
    <>
      <FieldSeparator>Or</FieldSeparator>

      <Field className="grid gap-4 sm:grid-cols-2">
        <Button variant="outline" type="button" disabled>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
              fill="currentColor"
            />
          </svg>
          Continue with Apple
        </Button>
        <Button variant="outline" type="button" disabled>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Continue with Google
        </Button>
      </Field>
    </>
  );
}
