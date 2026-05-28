const DEFAULT_RATING = 1200;
const PROVISIONAL_GAMES = 5;
const K_ESTABLISHED = 32;
const K_PROVISIONAL = 80;
function expectedScore(ra, rb) {
  return 1 / (1 + Math.pow(10, (rb - ra) / 400));
}
function kFactor(gamesPlayed) {
  return gamesPlayed < PROVISIONAL_GAMES ? K_PROVISIONAL : K_ESTABLISHED;
}
function newRating(ra, rb, score, gamesPlayed) {
  return Math.round(ra + kFactor(gamesPlayed) * (score - expectedScore(ra, rb)));
}
const TIME_CONTROLS = ["bullet", "blitz", "rapid", "classical"];
const ratingField = (tc) => `${tc}_rating`;
const gamesField = (tc) => `${tc}_games`;
function isProvisional(games) {
  return games < PROVISIONAL_GAMES;
}
function overallRating(p) {
  const ratings = TIME_CONTROLS.map((tc) => p[ratingField(tc)]).filter((r) => r != null);
  const games = TIME_CONTROLS.reduce((sum, tc) => sum + (p[gamesField(tc)] ?? 0), 0);
  if (ratings.length === 0) return { rating: null, games };
  const avg = Math.round(ratings.reduce((a, b) => a + b, 0) / ratings.length);
  return { rating: avg, games };
}
export {
  DEFAULT_RATING as D,
  PROVISIONAL_GAMES as P,
  TIME_CONTROLS as T,
  gamesField as g,
  isProvisional as i,
  newRating as n,
  overallRating as o,
  ratingField as r
};
