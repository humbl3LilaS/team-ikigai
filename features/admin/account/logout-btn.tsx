"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function LogoutBtn() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="secondary" className="mx-auto block mt-5 px-5">Logout</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to logout.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 justify-center">
          <DialogClose asChild>
            <Button type="button">Cancel</Button>
          </DialogClose>
          <Button variant="destructive">Logout</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
