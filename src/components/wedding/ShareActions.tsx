import { CalendarPlus, Link2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useInvitationActions } from "./useInvitationActions";

export function ShareActions({ tone = "gold", className }: { tone?: "gold" | "emerald"; className?: string }) {
  const { share, copyLink, downloadNikkah } = useInvitationActions();
  const outline = tone === "gold" ? "goldOutline" : "emeraldOutline";
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-3", className)}>
      <Button variant={tone === "gold" ? "gold" : "emerald"} size="xl" onClick={downloadNikkah}>
        <CalendarPlus /> Add to calendar
      </Button>
      <Button variant={outline} size="xl" onClick={share}>
        <Share2 /> Share
      </Button>
      <Button variant={outline} size="xl" onClick={copyLink}>
        <Link2 /> Copy link
      </Button>
    </div>
  );
}
