/** Scroll an element into view and pulse a pink ring around it so the eye lands on it. */
export const flashTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  el.animate(
    [
      { outline: '0px solid #FF3EA5', outlineOffset: '0px' },
      { outline: '6px solid #FF3EA5', outlineOffset: '6px' },
      { outline: '0px solid #FF3EA5', outlineOffset: '0px' },
    ],
    { duration: 700, delay: 500, iterations: 2, easing: 'ease-in-out' }
  );
};
