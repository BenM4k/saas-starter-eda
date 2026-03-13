"use client";

import { Plan, Plans, plans } from "@/constants/user";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Check, CreditCard } from "lucide-react";
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { updateUserPlanAction } from "@/actions/user.actions";
import { useRouter } from "next/navigation";

type Props = {
  subscriptionPlan: Plan;
  subscriptionEnd: Date | null;
  isSubscribed: boolean;
};

export default function SubscriptionForm({
  subscriptionPlan,
  isSubscribed,
  subscriptionEnd,
}: Props) {
  const [selectedPlan, setSelectedPlan] = useState(subscriptionPlan);
  const disableButton = selectedPlan === subscriptionPlan;
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function UpgradePlan(plan: Plan) {
    if (disableButton) return;
    startTransition(async () => {
      toast.promise(updateUserPlanAction(plan), {
        loading: "Updating...",
        success: (res) => {
          if (!res.data) {
            throw new Error(res.message);
          }
          router.refresh();
          return res.message;
        },
        error: (err) => err?.message ?? "Something went wrong",
      });
    });
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex flex-col items-start gap-2 text-base font-semibold text-card-foreground">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              Subscription
            </div>
            <Badge variant={isSubscribed ? "default" : "outline"}>
              {isSubscribed ? "Subscribed" : "Not subscribed"}
            </Badge>
          </div>
          <div className="text-sm">
            {subscriptionEnd && (
              <p>Subscription Ends:{subscriptionEnd.toDateString()}</p>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Choose a plan that fits your needs. Upgrade anytime to unlock more
            features.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                selectedPlan={selectedPlan}
                setSelectedPlan={setSelectedPlan}
                subscriptionPlan={subscriptionPlan}
              />
            ))}
          </div>
          <div className="flex justify-end">
            <Button
              disabled={disableButton || isPending}
              onClick={() => UpgradePlan(selectedPlan)}
            >
              {disableButton ? "Current Plan" : "Upgrade Plan"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PlanCard({
  plan,
  selectedPlan,
  setSelectedPlan,
  subscriptionPlan,
}: {
  plan: Plans[number];
  selectedPlan: Plan;
  setSelectedPlan: (plan: Plan) => void;
  subscriptionPlan: Plan;
}) {
  return (
    <div
      key={plan.id}
      onClick={() => setSelectedPlan(plan.id)}
      className={cn(
        "relative cursor-pointer rounded-lg border p-4 transition-colors",
        selectedPlan === plan.id
          ? "border-primary bg-primary/5"
          : "border-border bg-muted/50 hover:border-muted-foreground/50",
      )}
    >
      {plan.popular && (
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
          Popular
        </span>
      )}
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-card-foreground">{plan.name}</h3>
          <p className="text-xs text-muted-foreground">{plan.description}</p>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-card-foreground">
            {plan.price}
          </span>
          <span className="text-sm text-muted-foreground">{plan.period}</span>
        </div>
        <ul className="space-y-1.5">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <Check className="h-3 w-3 text-primary" />
              {feature}
            </li>
          ))}
        </ul>
        {plan.id === subscriptionPlan && (
          <span className="inline-block rounded bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            Current Plan
          </span>
        )}
      </div>
    </div>
  );
}
