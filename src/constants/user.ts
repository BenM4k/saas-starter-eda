export type Plan = "free" | "pro" | "team";
export type Plans = {
  id: Plan;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  current: boolean;
  popular?: boolean;
}[];

export const plans: Plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Basic task management",
    features: ["Up to 10 tasks", "Basic priority levels", "Email support"],
    current: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$9",
    period: "/month",
    description: "For power users",
    features: [
      "Unlimited tasks",
      "Advanced analytics",
      "Priority support",
      "Custom labels",
    ],
    current: false,
    popular: true,
  },
  {
    id: "team",
    name: "Team",
    price: "$29",
    period: "/month",
    description: "For small teams",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Admin dashboard",
      "API access",
    ],
    current: false,
  },
];
