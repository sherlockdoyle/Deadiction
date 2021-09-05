function roundingThreshold(numSecondsInT1, numT1InT2) {
  return (0.0124670262494863 * Math.log(numSecondsInT1) + 0.74420906279820525) * numT1InT2;
}

function roundTo5(num) {
  return Math.round(num / 5) * 5;
}

let a = {
  humanizeTime(second) {
    if (typeof second !== 'number') return 'some time ago';
    let duration = Math.round(new Date().getTime() / 1000 - second);
    if (duration < 0) return 'in the future';
    // seconds 
    if (duration < 10) return 'just now';
    let thresh = roundingThreshold(1, 60);
    if (duration < thresh) {
      const time = roundTo5(duration);
      return 'about ' + (time <= 1 ? 'a second' : time + ' seconds') + ' ago';
    }
    // minutes
    thresh = roundingThreshold(60, 60);
    duration /= 60;
    if (duration < thresh) {
      const time = roundTo5(duration);
      return 'about ' + (time <= 1 ? 'a minute' : time + ' minutes') + ' ago';
    }
    // hours
    thresh = roundingThreshold(60 * 60, 24);
    duration /= 60;
    if (duration < thresh) {
      const time = Math.round(duration);
      return 'about ' + (time <= 1 ? 'an hour' : time + ' hours') + ' ago';
    }
    // days
    thresh = roundingThreshold(60 * 60 * 24, 7);
    duration /= 24;
    if (duration < thresh) {
      const time = Math.round(duration);
      return time <= 1 ? 'yesterday' : 'about ' + time + ' days ago';
    }
    // weeks
    thresh = roundingThreshold(60 * 60 * 24 * 7, 4);
    let weekDuration = duration / 7;
    if (weekDuration < thresh) {
      const time = Math.round(weekDuration);
      return time <= 1 ? 'last week' : 'about ' + time + ' weeks ago';
    }
    // months
    thresh = roundingThreshold(60 * 60 * 24 * 30, 12);
    duration /= 30;
    if (duration < thresh) {
      const time = Math.round(duration);
      return time <= 1 ? 'last month' : 'about ' + time + ' months ago';
    }
    // years
    duration /= 12;
    const time = Math.round(duration);
    return time <= 1 ? 'last year' : 'about ' + time + ' years ago';
  }
};
window.humanizeTime = a.humanizeTime;
export default a;