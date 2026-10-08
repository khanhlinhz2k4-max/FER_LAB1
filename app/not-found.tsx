import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6" data-testid="not-found">
      <h2 className="text-4xl font-bold">404 - Not Found</h2>
      <p className="text-muted-foreground text-lg">Could not find requested resource</p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
