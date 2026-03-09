import { cn } from "@/lib/utils";
import { TodoStatus } from "@/types/todos";
import Link from "next/link";
import CreateTodoButton from "./create-todo-button";

const filterTabs: { label: string; value: TodoStatus }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "In Progress", value: "in progress" },
  { label: "Completed", value: "completed" },
];

export default function TodoListFilters({ filter }: { filter: TodoStatus }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1 rounded-md bg-muted p-1">
        {filterTabs.map((tab) => (
          <Link
            href={{ query: { status: tab.value } }}
            key={tab.value}
            className={cn(
              "rounded px-3 py-1 text-xs font-medium transition-colors",
              filter === tab.value
                ? "bg-background text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>
      <CreateTodoButton />
    </div>
  );
}
