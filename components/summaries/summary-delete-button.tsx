import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

export default function SummaryDeleteButton() {
  return (
    <Button
      size={"icon"}
      className="bg-gradient-to-r from-zinc-800 to-zinc-600 text-white shadow-md transition hover:brightness-180 hover:shadow-lg"
    >
      <Trash2 />
    </Button>
  );
}
