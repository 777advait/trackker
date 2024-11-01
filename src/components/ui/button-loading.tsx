import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ButtonLoading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Button className={cn("", className)} disabled>
      <Loader2 className="mr-1 h-4 w-4 animate-spin" />
      {children}
    </Button>
  );
}
