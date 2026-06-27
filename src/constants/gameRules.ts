/** Core run rules, kept dependency-free so utils can import them without cycles. */
// Win = end the week with performance at or above RAISE_THRESHOLD.
// Outcome "raise" points fold into performance, so one meter decides the raise.
// 85 with a 40 start ≈ 49% win rate for thoughtful play, ~23% for random clicking
// (measured via scripts/simulateWinRate.ts).
export const RAISE_THRESHOLD = 85;
export const STARTING_PERFORMANCE = 40;
export const TOTAL_DAYS = 5;
