"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

export default function DeleteAccount() {
  return (
    <Card className="border-destructive/30 bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold text-destructive">
          Danger Zone
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-card-foreground">Delete Account</p>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all associated data.
            </p>
          </div>
          <Button variant="destructive" size="sm">
            Delete Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
