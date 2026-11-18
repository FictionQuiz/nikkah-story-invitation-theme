export interface CountdownParts {
  done: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/** Time remaining from `now` until `target` (both epoch ms), split into parts. */
export function getCountdown(target: number, now: number): CountdownParts {
  const diff = target - now;
  if (diff <= 0) return { done: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  const totalSeconds = Math.floor(diff / 1000);
  return {
    done: false,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}
