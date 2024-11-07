import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function dateConverter(postedDateString, typeOfConversion) {
  const postedDate = new Date(postedDateString);
  if (typeOfConversion === "shortenedDifference") {
    const currentDateInMs = Date.now();
    const postedDateInMs = postedDate.getTime();

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
      return differences.years === 1
        ? `${differences.years} year ago`
        : `${differences.years} years ago`;
    } else if (differences.months) {
      return differences.months === 1
        ? `${differences.months} month ago`
        : `${differences.months} months ago`;
    } else if (differences.weeks) {
      return differences.weeks === 1
        ? `${differences.weeks} week ago`
        : `${differences.weeks} weeks ago`;
    } else if (differences.days) {
      return differences.days === 1
        ? `${differences.days} day ago`
        : `${differences.days} days ago`;
    } else if (differences.hours) {
      return differences.hours === 1
        ? `${differences.hours} hour ago`
        : `${differences.hours} hours ago`;
    } else if (differences.minutes) {
      return differences.years === 1
        ? `${differences.minutes} minute ago`
        : `${differences.minutes} minutes ago`;
    } else if (differences.seconds) {
      return differences.years === 1
        ? `${differences.seconds} second ago`
        : `${differences.seconds} seconds ago`;
    } else return `now`;
  }

  const day = postedDate.getDate().toString().padStart(2, "0");
  const month = (postedDate.getMonth() + 1).toString().padStart(2, "0");
  const year = postedDate.getFullYear().toString().padStart(2, "0");
  const hours = postedDate.getHours().toString().padStart(2, "0");
  const minutes = postedDate.getMinutes().toString().padStart(2, "0");
  const amOrPm = hours >= 12 ? "pm" : "am";
  return `${day}/${month}/${year} ${hours}:${minutes}${amOrPm}`;
}

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const topOfPage = document.querySelector("#header-top");
    return topOfPage.scrollIntoView({ behavior: "smooth" });
  }, [pathname]);
}
