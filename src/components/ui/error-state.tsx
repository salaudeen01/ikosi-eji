import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
// import Layout from "../layout";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    // <Layout>
      <div className="flex flex-col items-center justify-center text-center py-20 px-4">
        <div className="flex flex-col items-center gap-4 max-w-md">
          <AlertTriangle className="h-12 w-12 text-destructive" />
          <h2 className="text-2xl font-semibold text-[hsl(var(--foreground))]">
            Something went wrong
          </h2>
          <p className="text-[hsl(var(--muted-foreground))]">
            {message || "We couldn’t load the page or content. Please try again."}
          </p>
          {onRetry && (
            <Button onClick={onRetry} variant="default" className="mt-4">
              Try Again
            </Button>
          )}
        </div>
      </div>
    // </Layout>
  );
}
