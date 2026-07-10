import Link from "next/link";
import { ErrorScreen, errorActionClass } from "@/components/common";

// Used for routes outside of [locale] and as fallback for unmatched paths.
// Renders inside root layout — CSS vars are available via ThemeProvider.
export default function NotFound() {
  return (
    <ErrorScreen
      code="404"
      heading="Page not found"
      body="The page you're looking for doesn't exist or has been moved."
    >
      <Link href="/en" className={errorActionClass}>
        ← Back to home
      </Link>
    </ErrorScreen>
  );
}
