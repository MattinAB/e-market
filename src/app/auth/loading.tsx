import { Spinner } from "@/components/ui/spinner";

export default function loading() {
  return (
    <div className="flex min-h-screen w-full justify-center items-center bg-black/50 ">
      <Spinner className="size-10" />
    </div>
  );
}
