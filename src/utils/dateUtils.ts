export function formatDate(date: Date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const year = date.getFullYear();

  const formattedDate = `${months[date.getMonth()]} ${date.getDate()}, ${year}`;

  return formattedDate;
}

export const getCurrentFormattedDateTime = (date: Date) => {
  const currentDate = date;

  const currentHour = currentDate.getHours();

  const currentMinutes = currentDate.getMinutes();

  const formattedHour = currentHour < 10 ? "0" + currentHour : currentHour;

  const formattedMinutes =
    currentMinutes < 10 ? "0" + currentMinutes : currentMinutes;

  // Format the date and time as a string
  const formattedDateTime =
    currentDate.toLocaleDateString() +
    " " +
    formattedHour +
    ":" +
    formattedMinutes;

  // Return the formatted date and time
  return formattedDateTime;
};
