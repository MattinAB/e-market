import { Alert, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";

export default function SuccessAlert({ title, ...props }: { title: string }) {
  return (
    <div className="grid w-full max-w-xl items-start gap-4 mb-4" {...props}>
      <Alert className="bg-green-50 border-green-200 text-green-700">
        <CheckCircle2Icon />
        <AlertTitle>{title}</AlertTitle>
      </Alert>
    </div>
  );
}
