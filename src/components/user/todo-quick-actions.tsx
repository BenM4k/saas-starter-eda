"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Circle,
  Clock,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { useTransition } from "react";
import {
  deleteTodoAction,
  updateTaskStatusAction,
} from "@/actions/todos.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TodoQuickActions({ id }: { id: string }) {
  const router = useRouter();
  const [isDeleting, startDeleteTransition] = useTransition();
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (
    status: "pending" | "in progress" | "completed",
  ) => {
    startTransition(() => {
      toast.promise(updateTaskStatusAction(status, id), {
        loading: "Updating status...",
        success: (res) => {
          if (!res.data) {
            throw new Error(res.message);
          }
          router.refresh();
          return res.message;
        },
        error: (err) => err.message ?? "Something went wrong",
      });
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-foreground"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-border bg-popover">
        <DropdownMenuItem
          onClick={() => handleStatusChange("pending")}
          disabled={isPending}
          className="gap-2 text-popover-foreground"
        >
          <Circle className="h-4 w-4" />
          Set Pending
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleStatusChange("in progress")}
          disabled={isPending}
          className="gap-2 text-popover-foreground"
        >
          <Clock className="h-4 w-4" />
          Set In Progress
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleStatusChange("completed")}
          disabled={isPending}
          className="gap-2 text-popover-foreground"
        >
          <CheckCircle2 className="h-4 w-4" />
          Set Completed
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2 text-popover-foreground" asChild>
          <Link
            href={{
              query: { editing: true },
              pathname: `/dashboard/todo/${id}`,
            }}
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2 text-destructive"
          disabled={isDeleting}
          onClick={() =>
            startDeleteTransition(async () => {
              const res = await deleteTodoAction(id);
              if (!res.data) {
                toast.error(res.message);
                return;
              } else {
                toast.success(res.message);
                router.refresh();
              }
            })
          }
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
