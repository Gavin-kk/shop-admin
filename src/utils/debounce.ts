export function debounce(time:number, fn:() => void):() => void {
  let timer:number | null = null;
  return () => {
    if (timer) {
      clearTimeout(timer);
      timer = window.setTimeout(fn, time);
    } else {
      timer = window.setTimeout(fn, time);
    }
  };
}
