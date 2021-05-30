let timer:number | null = null;

export function debounce(time:number, fn:() => void):() => void {
  return () => {
    if (timer) {
      clearTimeout(timer);
      timer = window.setTimeout(fn, time);
    } else {
      timer = window.setTimeout(fn, time);
    }
  };
}
