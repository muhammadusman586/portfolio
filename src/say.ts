export const SAY = 'buddy-say';
export type SayDetail = { who: string; text: string; ms?: number };

export const say = (who: string, text: string, ms = 2400) =>
  window.dispatchEvent(new CustomEvent<SayDetail>(SAY, { detail: { who, text, ms } }));
