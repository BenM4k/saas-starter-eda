"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { User } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { namesSchemaType } from "@/types/user";
import { namesSchema } from "@/schemas/user";
import { CustomFormField } from "../auth/formfield";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { useTransition } from "react";

type Props = {
  firstName: string;
  lastName: string;
};

export default function NamesForm({ firstName, lastName }: Props) {
  const [isPending, startTransition] = useTransition();
  const { user } = useUser();
  const router = useRouter();

  const form = useForm<namesSchemaType>({
    resolver: zodResolver(namesSchema),
    defaultValues: {
      firstName,
      lastName,
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    const { firstName, lastName } = values;
    if (!user) return;
    startTransition(() => {
      toast.promise(user.update({ firstName, lastName }), {
        loading: "Updating user...",
        success: (res) => {
          router.refresh();
          form.reset();
          return `Updated user to ${res.firstName} - ${res.lastName}`;
        },
        error: (err) => err?.message ?? "something went wrong",
      });
    });
  });
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-card-foreground">
          <User className="h-4 w-4 text-primary" />
          Profile Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <CustomFormField
                control={form.control}
                name="firstName"
                label="First Name"
                className="border-border bg-muted text-foreground"
              />
            </div>
            <div className="space-y-2">
              <CustomFormField
                control={form.control}
                name="lastName"
                label="Last Name"
                className="border-border bg-muted text-foreground"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
