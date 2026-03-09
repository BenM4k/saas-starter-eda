"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { CreateTodoDialog } from "./create-todo-dialog";

export default function CreateTodoButton() {
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  return (
    <>
      <Button
        size="sm"
        onClick={() => setIsCreateOpen(true)}
        className="gap-1.5"
      >
        <Plus className="h-4 w-4" />
        New Task
      </Button>
      <CreateTodoDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </>
  );
}
