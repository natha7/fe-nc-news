export function dateConverter(postDateString) {
  const currentDateInMs = Date.now();
  const postedDateInMs = new Date(postDateString).getTime();

  const timeDifference = currentDateInMs - postedDateInMs;

  const differences = {
    years: Math.floor(timeDifference / 1000 / 60 / 60 / 24 / 7 / 4.345 / 12),
    months: Math.floor(timeDifference / 1000 / 60 / 60 / 24 / 7 / 4.345),
    weeks: Math.floor(timeDifference / 1000 / 60 / 60 / 24 / 7),
    days: Math.floor(timeDifference / 1000 / 60 / 60 / 24),
    hours: Math.floor(timeDifference / 1000 / 60 / 60),
    minutes: Math.floor(timeDifference / 1000 / 60),
    seconds: Math.floor(timeDifference / 1000),
  };

  if (differences.years) {
    return `${differences.years} years ago`;
  } else if (differences.months) {
    return `${differences.months} months ago`;
  } else if (differences.weeks) {
    return `${differences.weeks} weeks ago`;
  } else if (differences.days) {
    return `${differences.days} days ago`;
  } else if (differences.hours) {
    return `${differences.hours} hours ago`;
  } else if (differences.minutes) {
    return `${differences.minutes} minutes ago`;
  } else if (differences.seconds) {
    return `${differences.seconds} seconds ago`;
  } else return `now`;
}
