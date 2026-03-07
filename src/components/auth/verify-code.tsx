"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { verifyCodeSchemaType } from "@/types/auth";
import { verifyCodeSchema } from "@/schemas/auth";
import { CustomFormField } from "./formfield";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Card } from "../ui/card";
import { useTransition } from "react";
import { Loader } from "lucide-react";
import { SignUpErrors, SignUpFutureResource } from "@clerk/nextjs/types";

export default function VerifyCode({
  signUp,
  errors,
  fetchStatus,
}: {
  signUp: SignUpFutureResource;
  errors: SignUpErrors;
  fetchStatus: "fetching" | "idle";
}) {
  const [isCodePending, startCodeTransition] = useTransition();
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<verifyCodeSchemaType>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const handleVerify = form.handleSubmit((values) => {
    startCodeTransition(async () => {
      const { code } = values;

      await signUp.verifications.verifyEmailCode({
        code,
      });

      if (errors.fields.code) {
        //toast
        return;
      }

      if (signUp.status === "complete") {
        await signUp.finalize({
          // Redirect the user to the home page after signing up
          navigate: ({ session, decorateUrl }) => {
            if (session?.currentTask) {
              // Handle pending session tasks
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
      } else {
        // Check why the sign-up is not complete
        console.error("Sign-up attempt not complete:", signUp);
      }
    });
  });
  return (
    <div className="h-screen w-120 mx-auto flex flex-col justify-center">
      <Card className="p-8 space-y-2">
        <h1 className="font-bold text-xl text-center">Verify your account</h1>
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <CustomFormField
              control={form.control}
              name="code"
              label=""
              placeholder="XXX-XXX"
            />
          </div>
          {errors.fields.code && <p>{errors.fields.code.message}</p>}
          <Button
            type="submit"
            disabled={fetchStatus === "fetching" || isCodePending}
            className="w-full"
          >
            {isCodePending ? (
              <Loader className="size-4 animate-spin" />
            ) : (
              <span>Verify</span>
            )}
          </Button>
        </form>
        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          onClick={() => {
            startTransition(() => {
              signUp.verifications.sendEmailCode();
            });
          }}
        >
          {isPending ? (
            <Loader className="size-4 animate-spin" />
          ) : (
            <span>I need a new code</span>
          )}
        </Button>
      </Card>
    </div>
  );
}
