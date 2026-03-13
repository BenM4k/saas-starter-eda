import NamesForm from "./names-form";
import EmailForm from "./email-form";
import PasswordForm from "./password-form";
import SubscriptionForm from "./subscription-form";
import DeleteAccount from "./delete-account";
import { auth, currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { getUserFromDb } from "@/dal/users/queries";

export async function UserSettingsForm() {
  const { isAuthenticated, userId } = await auth();
  if (!isAuthenticated) return notFound();
  const dbUser = await getUserFromDb(userId);
  if (!dbUser) return notFound();
  return (
    <div className="space-y-6">
      <NamesForm firstName={dbUser.firstName} lastName={dbUser.lastName} />
      <EmailForm email={dbUser.email} />
      <PasswordForm />
      <SubscriptionForm
        subscriptionPlan={dbUser.subscriptionType}
        subscriptionEnd={dbUser.subscriptionEnds}
        isSubscribed={dbUser.isSubscribe}
      />
      <DeleteAccount />
    </div>
  );
}
