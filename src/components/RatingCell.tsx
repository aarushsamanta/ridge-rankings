import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PROVISIONAL_GAMES, isProvisional } from "@/lib/elo";

export function RatingCell({
  rating,
  games,
  className,
}: {
  rating: number | null;
  games: number;
  className?: string;
}) {
  if (rating == null) {
    return <span className="text-muted-foreground italic">Unrated</span>;
  }
  const provisional = isProvisional(games);
  return (
    <span className={className}>
      <span className="text-primary font-semibold">{rating}</span>
      {provisional && (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="ml-1 text-primary/80 cursor-help select-none">?</span>
            </TooltipTrigger>
            <TooltipContent>
              <span className="text-xs">
                Provisional rating · {games}/{PROVISIONAL_GAMES} games completed
              </span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </span>
  );
}
