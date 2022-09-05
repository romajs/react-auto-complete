/**
 * Creates a function debounce instance
 * @param cb
 * @param delay
 * @returns cancel function
 */
export default function debounce<Args extends any[], F extends (...args: Args) => any>(
  cb: F,
  delay: number | undefined = 0
): (...args: Parameters<F>) => void {
  let t;
  return (...args: Parameters<F>) => {
    if (t) clearInterval(t);
    t = setTimeout(() => cb.apply(cb, args), delay);
  };
}
