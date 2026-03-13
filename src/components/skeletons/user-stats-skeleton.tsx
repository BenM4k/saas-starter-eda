import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function StatsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <Card key={i}>
          <CardContent className="flex items-center gap-4 p-6">
            <Skeleton className="h-12 w-12 rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function UserTodosSkeleton() {
  return (
    <Card className="border-border bg-card animate-pulse">
      {/* Card Header */}
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          {/* Title */}
          <Skeleton className="h-5 w-32 rounded-md" />
          {/* Filters / Button */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-8 rounded-md" />
              <Skeleton className="h-6 w-10 rounded-md" />
              <Skeleton className="h-6 w-14 rounded-md" />
              <Skeleton className="h-6 w-12 rounded-md" />
            </div>
            <Skeleton className="h-6 w-20 rounded-md" />
          </div>
        </div>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="space-y-3">
        {/* 3 skeleton todo items */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex items-start gap-4 rounded-lg border border-border bg-muted/50 p-4"
          >
            {/* Status icon */}
            <Skeleton className="h-5 w-5 rounded-full" />

            {/* Todo text content */}
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between gap-4">
                <Skeleton className="h-4 w-32 rounded-md" /> {/* title */}
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-12 rounded-full" />{" "}
                  {/* priority */}
                  <Skeleton className="h-5 w-5 rounded-md" />{" "}
                  {/* quick action */}
                </div>
              </div>
              <Skeleton className="h-3 w-full rounded-md" /> {/* description */}
              <Skeleton className="h-3 w-40 rounded-md" /> {/* due date */}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
