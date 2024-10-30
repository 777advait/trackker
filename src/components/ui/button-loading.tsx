import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ButtonLoading({ children }: { children: React.ReactNode }) {
  return (
    <Button disabled>
      <Loader2 className="mr-1 h-4 w-4 animate-spin" />
      {children}
    </Button>
  );
}
