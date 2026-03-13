"use client";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { deleteSummaryAction } from "@/actions/summary-actions";
import { toast } from "sonner";

export default function SummaryDeleteButton({
  summaryid,
}: {
  summaryid: string;
}) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    const result = await deleteSummaryAction({ summaryid });
    setOpen(false);
    if (!result?.success) {
      toast.error("Cannot Delete Summary", {
        description: "Something went wrong. Failed to delete the summary.",
      });
    } else {
      toast.success("Summary Delete Successfully");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          className="bg-gradient-to-r from-zinc-800 to-zinc-600 text-white shadow-md transition hover:brightness-180 hover:shadow-lg"
        >
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Summary</DialogTitle>
          <DialogDescription>
            Arey you sure you want to delte this summary? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => setOpen(false)}
            className="bg-neutral-100 text-neutral-800 transition hover:text-neutral-400 hover:bg-neutral-100"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            className="bg-gradient-to-r from-zinc-800 to-zinc-600 text-white shadow-md transition hover:brightness-180 hover:shadow-lg"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
