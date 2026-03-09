"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { createTodoSchemaType } from "@/types/todos";
import { createTodoSchema } from "@/schemas/todos";
import { useForm } from "react-hook-form";
import { CustomFormField } from "../auth/formfield";
import { createTodoAction } from "@/actions/todos.action";
import { toast } from "sonner";

interface CreateTodoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTodoDialog({
  open,
  onOpenChange,
}: CreateTodoDialogProps) {
  const router = useRouter();
  const defaultDueDate = new Date();
  defaultDueDate.setDate(defaultDueDate.getDate() + 15);

  const form = useForm<createTodoSchemaType>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: defaultDueDate.toISOString().split("T")[0],
      priority: "low",
      status: "pending",
    },
  });

  const handleCreate = form.handleSubmit(async (values) => {
    console.log(values);
    const res = await createTodoAction(values);

    if (!res.data) {
      toast.error(res.message);
      return;
    } else {
      toast.success(`Task: ${res.data.title} created`);
      router.refresh();
      onOpenChange(false);
      form.reset();
    }
  });
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border bg-card sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">
            Create New Task
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Add a new task to your list. Fill out the details below.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleCreate}>
          <div className="space-y-2">
            <CustomFormField
              control={form.control}
              name="title"
              label="Title"
            />
          </div>
          <div className="space-y-2">
            <CustomFormField
              control={form.control}
              name="description"
              fieldType="textarea"
              rows={6}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <CustomFormField
                control={form.control}
                name="priority"
                fieldType="select"
                label="Priority"
                selectOptions={[
                  { name: "Low", value: "low" },
                  { name: "Medium", value: "medium" },
                  { name: "High", value: "high" },
                ]}
              />
            </div>
            <div className="space-y-2">
              <CustomFormField
                control={form.control}
                name="dueDate"
                type="date"
                label="Due date"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
            <Button type="submit">Create Task</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
