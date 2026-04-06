import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function DateComponent({
  dateString,
  className,
}: {
  dateString: string;
  className?: string;
}) {
  return (
    <time dateTime={dateString} className={cn(className)}>
      {format(new Date(dateString), "LLLL d, yyyy")}
    </time>
  );
}
