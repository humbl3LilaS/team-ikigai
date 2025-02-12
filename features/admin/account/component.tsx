"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

import { updateUsername } from "./action";

export function AdminAccountForm({ currentUsername }: { currentUsername: string }) {
  const [username, setUsername] = useState(currentUsername);

  const mutation = useMutation({
    mutationFn: updateUsername,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Username updated successfully!",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update username. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(username);
  };

  return (
    <Card className="mt-5 max-w-md">
      <CardHeader>
        <CardTitle>Update Username</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={mutation.isPending} className="w-full">
            {mutation.isPending ? "Updating..." : "Update"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
