/**
 * Helper function to pad zeros.
 */
export function zeroPad (num, places = 2) {
  const zero = places - num.toString().length + 1;
  return Array(zero > 0 ? zero : 0).join('0') + num;
}

export function fileSizeToString (size) {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return `${(Number(size / Math.pow(1024, i)).toFixed(2))}${[ 'B', 'kB', 'MB', 'GB', 'TB' ][i]}`;
}

export function arraysEqual (a, b) {
  if (a === b) { return true; }
  if (!a || !b) { return false; }
  if (a.length !== b.length) { return false; }
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) { return false; }
  }
  return true;
}

/**
 * Creates and returns a new debounced version of the passed function which
 * will postpone its execution until after wait milliseconds have elapsed since
 * the last time it was invoked. Useful for implementing 'search'. After we
 * stopped entering the search string, we want to perform a single search.
 * NOTE: based on underscore's debounce()
 * @param {function} func The function to be applied after a certain time.
 * @param {wait} number The number of milliseconds to wait until execution.
 */
/* eslint-disable */
export function slowdown (func, wait, immediate) {
  let timeout;
	return function() {
		const context = this;
    const args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) {
        func.apply(context, args);
      }
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) {
      func.apply(context, args);
    }
	};
}
/* eslint-enable */
