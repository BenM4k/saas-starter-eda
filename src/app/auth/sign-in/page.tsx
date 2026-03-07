"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useAuth, useSignIn } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchemaType } from "@/types/auth";
import { signInSchema } from "@/schemas/auth";
import { CustomFormField } from "@/components/auth/formfield";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { signIn, fetchStatus } = useSignIn();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  if (signIn.status === "complete" || isSignedIn) {
    return null;
  }

  const handleSubmit = form.handleSubmit(async (values) => {
    const { emailAddress, password } = values;

    const { error } = await signIn.password({ emailAddress, password });

    if (error) return;

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            //  Handle pending session tasks
            // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
            console.log(session?.currentTask);
            return;
          }

          const url = decorateUrl("/");
          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            router.push(url);
          }
        },
      });
    }
  });

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-md">
        <div className={cn("flex flex-col gap-6")}>
          <Card className="p-8">
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-xl font-bold">Login </h1>
                  <FieldDescription>
                    Don&apos;t have an account?{" "}
                    <Link href="/auth/sign-up">Sign up</Link> or return to{" "}
                    <Link href="/">Home page</Link>
                  </FieldDescription>
                </div>
                <CustomFormField
                  control={form.control}
                  name="emailAddress"
                  label="Email"
                />
                <CustomFormField
                  control={form.control}
                  name="password"
                  label="Password"
                  type="password"
                />
                <Field>
                  <Button type="submit" disabled={fetchStatus === "fetching"}>
                    Login
                  </Button>
                </Field>
              </FieldGroup>
            </form>
            <FieldDescription className="px-6 text-center">
              By clicking continue, you agree to our{" "}
              <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>.
            </FieldDescription>
          </Card>
        </div>
      </div>
    </div>
  );
}
