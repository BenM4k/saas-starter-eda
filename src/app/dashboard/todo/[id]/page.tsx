import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import Todo from "@/components/user/todo";
import { getTodoById } from "@/dal/todos/queries";

export default async function UserTodoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const todo = await getTodoById(id);

  return (
    <DashboardLayout
      role="user"
      title="Todo Details"
      description={`Task #${id}`}
    >
      <Todo todoData={todo} />
    </DashboardLayout>
  );
}
