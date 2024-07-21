export function validateMonthYear(dateString: string): boolean {
  // Check if the string matches the pattern MM/YY
  if (!/^\d{2}\/\d{2}$/.test(dateString)) {
    return false;
  }

  const [monthStr, yearStr] = dateString.split('/');
  const month = parseInt(monthStr, 10);
  const year = parseInt(yearStr, 10);

  // Check if month is valid (01-12)
  if (month < 1 || month > 12) {
    return false;
  }

  // Get current date
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100; // Get last two digits of current year
  const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11

  // Check if the date is not in the past
  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return false;
  }

  return true;
}
