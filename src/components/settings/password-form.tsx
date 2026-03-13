"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Lock, EyeOff, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { updatePasswordSchemaType } from "@/types/user";
import { updatePasswordSchema } from "@/schemas/user";
import { CustomFormField } from "../auth/formfield";
import { useReverification, useUser } from "@clerk/nextjs";
import { toast } from "sonner";

export default function PasswordForm() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { user } = useUser();

  const router = useRouter();

  const form = useForm<updatePasswordSchemaType>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      confirmNewPwd: "",
      currentPwd: "",
      newPwd: "",
    },
  });

  const updatePassword = useReverification(
    (currentPassword: string, newPassword: string) => {
      return user?.updatePassword({ currentPassword, newPassword });
    },
  );

  const handleSubmit = form.handleSubmit((values) => {
    const { newPwd, currentPwd } = values;
    if (!user) return;
    startTransition(() => {
      toast.promise(updatePassword(currentPwd, newPwd), {
        loading: "Updating password...",
        success: (res) => {
          router.refresh();
          return "Password updated";
        },
        error: (err) => err?.message ?? "Something went wrong",
      });
    });
  });

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-card-foreground">
          <Lock className="h-4 w-4 text-primary" />
          Change Password
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <div className="relative">
              <CustomFormField
                control={form.control}
                label="Current Password"
                placeholder="Enter current password"
                name="currentPwd"
                type={showCurrentPassword ? "text" : "password"}
                className="border-border bg-muted pr-10 text-foreground placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground mt-4"
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="relative">
                <CustomFormField
                  control={form.control}
                  label="New Password"
                  placeholder="Enter new password"
                  name="newPwd"
                  type={showNewPassword ? "text" : "password"}
                  className="border-border bg-muted pr-10 text-foreground placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground mt-4"
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <CustomFormField
                  control={form.control}
                  label="Confirm Password"
                  placeholder="confirm new password"
                  name="confirmNewPwd"
                  type={showConfirmPassword ? "text" : "password"}
                  className="border-border bg-muted pr-10 text-foreground placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground mt-4"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Password must be at least 8 characters and include a number and
            special character.
          </p>
          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              Update Password
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
