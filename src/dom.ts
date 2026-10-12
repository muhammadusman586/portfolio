export const flashTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  // WAAPI keyframes don't resolve var(), so read the current theme's accent.
  const c = `rgb(${getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()})`;
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  el.animate(
    [
      { outline: `0px solid ${c}`, outlineOffset: '0px' },
      { outline: `6px solid ${c}`, outlineOffset: '6px' },
      { outline: `0px solid ${c}`, outlineOffset: '0px' },
    ],
    { duration: 700, delay: 500, iterations: 2, easing: 'ease-in-out' }
  );
};
