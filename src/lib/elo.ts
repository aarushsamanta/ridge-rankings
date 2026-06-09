// USCF-style Elo with provisional ratings.
// First PROVISIONAL_GAMES games in a mode use a higher K-factor (volatile),
// after that ratings settle with the standard K-factor.

export const DEFAULT_RATING = 1200;
export const PROVISIONAL_GAMES = 5;
export const K_ESTABLISHED = 32;
export const K_PROVISIONAL = 80; // highly volatile during first games

export type Score = 0 | 0.5 | 1;

export function expectedScore(ra: number, rb: number): number {
  return 1 / (1 + Math.pow(10, (rb - ra) / 400));
}

export function kFactor(gamesPlayed: number): number {
  return gamesPlayed < PROVISIONAL_GAMES ? K_PROVISIONAL : K_ESTABLISHED;
}

export function newRating(ra: number, rb: number, score: Score, gamesPlayed: number): number {
  return Math.round(ra + kFactor(gamesPlayed) * (score - expectedScore(ra, rb)));
}

export type TimeControl = "bullet" | "blitz" | "rapid" | "classical";
export const TIME_CONTROLS: TimeControl[] = ["bullet", "blitz", "rapid", "classical"];

export const ratingField = (tc: TimeControl) => `${tc}_rating` as const;
export const gamesField = (tc: TimeControl) => `${tc}_games` as const;

export function isProvisional(games: number): boolean {
  return games < PROVISIONAL_GAMES;
}

// Overall = average of rated modes (provisional ones included for visibility).
// Overall is provisional if total games across all modes is < PROVISIONAL_GAMES.
export type PlayerRatings = {
  bullet_rating: number | null;
  blitz_rating: number | null;
  rapid_rating: number | null;
  classical_rating: number | null;
  bullet_games: number;
  blitz_games: number;
  rapid_games: number;
  classical_games: number;
};

export function overallRating(p: PlayerRatings): { rating: number | null; games: number } {
  const ratings = TIME_CONTROLS
    .map((tc) => p[ratingField(tc)] as number | null)
    .filter((r): r is number => r != null);
  const games = TIME_CONTROLS.reduce((sum, tc) => sum + (p[gamesField(tc)] ?? 0), 0);
  if (ratings.length === 0) return { rating: null, games };
  const avg = Math.round(ratings.reduce((a, b) => a + b, 0) / ratings.length);
  return { rating: avg, games };
}
