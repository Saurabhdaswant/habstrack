import { format } from "date-fns";

export function getAllStreaks(dates) {
  const sortedDates = getSortedDates(dates);

  let result = [];

  if (sortedDates.length === 0) {
    return result;
  }

  let currentArray = [sortedDates[0]];

  for (let i = 1; i < sortedDates.length; i++) {
    // If the difference between the current date and the previous date is greater than one day,
    // we start a new sub-array
    if (sortedDates[i] - sortedDates[i - 1] > 86400000) {
      // 86400000 is the number of milliseconds in one day
      result.push(currentArray);
      currentArray = [];
    }
    currentArray.push(sortedDates[i]);
  }

  result.push(currentArray);

  return result;
}

export function getTheLengthOfStreaks(streaks) {
  let lengths = [];

  for (let streakIndex = 0; streakIndex < streaks.length; streakIndex++) {
    lengths.push(streaks[streakIndex].length);
  }

  return lengths;
}

export function getTheBestStreakCount(streaks) {
  const streaksCount = getTheLengthOfStreaks(streaks);

  if (streaksCount.length === 0) {
    // If there are no streaks, return undefined or some suitable value
    return 0;
  }

  // Initialize bestCount with the first streak count
  let bestCount = streaksCount[0];

  // Start the loop from the second streak count
  for (let i = 1; i < streaksCount.length; i++) {
    if (streaksCount[i] > bestCount) {
      bestCount = streaksCount[i];
    }
  }

  return bestCount;
}

export function getTheCurrentStreakCount(streaks, today, yesterday) {
  let currentStreakDates = [];

  const formattedToday = format(today, "yy-MM-dd");
  const formattedYesterday = format(yesterday, "yy-MM-dd");

  for (let streakIndex = 0; streakIndex < streaks.length; streakIndex++) {
    const dates = getFormattedDates(streaks[streakIndex]);

    for (let index = 0; index < dates.length; index++) {
      if (dates.length > 1) {
        if (
          dates[index]?.includes(formattedToday) ||
          dates[index]?.includes(formattedYesterday)
        ) {
          currentStreakDates = streaks[streakIndex];
        }
      } else if (dates.length === 1) {
        if (dates[0] === formattedToday || dates[0] === formattedYesterday) {
          currentStreakDates = [dates[0]];
        }
      }
    }
  }
  return currentStreakDates.length;
}

export const getSortedDates = (dates) => {
  return [...dates].sort((a, b) => a - b);
};

export const getFormattedDates = (dates) => {
  return dates?.map((date) => format(new Date(date), "yy-MM-dd"));
};

export function getDates(startingDate, endingDate) {
  // Create an empty array to store the dates
  const dates = [];

  // Convert the starting and ending dates to Date objects
  const startDate = new Date(startingDate);
  const endDate = new Date(endingDate);

  // Loop through each day between the starting and ending dates
  for (
    let date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    // Add the current date to the array
    dates.push(new Date(date));
  }

  // Return the array of dates
  return dates;
}

export const filterDatesByWeekdays = (theDates, repeatDays) => {
  const newDates = [];
  for (let index = 0; index < theDates.length; index++) {
    const date = theDates[index];

    const dayOfWeek = new Date(date)
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();

    if (repeatDays.includes(dayOfWeek)) {
      newDates.push(new Date(date));
    }
  }

  return newDates;
};
