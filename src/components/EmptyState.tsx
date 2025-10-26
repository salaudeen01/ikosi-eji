import { FileX2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptyState({
  title = "No Articles Found",
  description = "We couldn’t find any articles.",
  onRefresh,
}: {
  title?: string;
  description?: string;
  onRefresh?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <FileX2 className="h-16 w-16 text-muted-foreground mb-4" />
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6">{description}</p>
      {onRefresh && (
        <Button variant="outline" onClick={onRefresh}>
          Try Again
        </Button>
      )}
    </div>
  );
}
