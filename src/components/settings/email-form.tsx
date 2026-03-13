"use client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Mail } from "lucide-react";
import { Button } from "../ui/button";
import { emailSchemaType } from "@/types/user";
import { emailSchema } from "@/schemas/user";
import { useUser, useReverification } from "@clerk/nextjs";
import { CustomFormField } from "../auth/formfield";
import { useTransition } from "react";
import { toast } from "sonner";

export default function EmailForm({ email }: { email: string }) {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const { user, isLoaded } = useUser();

  const form = useForm<emailSchemaType>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      emailAddress: email,
    },
  });

  const createEmailAddress = useReverification((email: string) =>
    user?.createEmailAddress({ email }),
  );
  const handleSubmit = form.handleSubmit(async (values) => {
    const { emailAddress } = values;
    const res = await createEmailAddress(emailAddress);
    await user?.reload();

    const email = user?.emailAddresses.find((e) => e.id === res?.id);

    if (!email) {
      toast.error("Email was not found");
      return;
    }

    const { startEmailLinkFlow } = email.createEmailLinkFlow();
  });
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-card-foreground">
          <Mail className="h-4 w-4 text-primary" />
          Email Address
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <CustomFormField
              control={form.control}
              name="emailAddress"
              label="Email"
              className="border-border bg-muted text-foreground"
            />

            <p className="text-xs text-muted-foreground">
              You will receive a verification email after changing your email
              address.
            </p>
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              Update Email
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
