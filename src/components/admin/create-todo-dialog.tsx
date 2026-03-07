"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreateTodoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTodoDialog({
  open,
  onOpenChange,
}: CreateTodoDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">
            Create New Todo
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-card-foreground">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Enter task title"
              className="border-border bg-muted text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-card-foreground">
              Description
            </Label>
            <textarea
              id="description"
              placeholder="Enter task description"
              rows={3}
              className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-card-foreground">
                Priority
              </Label>
              <select
                id="priority"
                className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm text-foreground"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="assignee" className="text-card-foreground">
                Assignee
              </Label>
              <select
                id="assignee"
                className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm text-foreground"
              >
                <option value="">Select user</option>
                <option value="sarah">Sarah M.</option>
                <option value="john">John D.</option>
                <option value="emily">Emily R.</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dueDate" className="text-card-foreground">
              Due Date
            </Label>
            <Input
              id="dueDate"
              type="date"
              className="border-border bg-muted text-foreground"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-border text-foreground"
            >
              Cancel
            </Button>
            <Button type="submit">Create Todo</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
