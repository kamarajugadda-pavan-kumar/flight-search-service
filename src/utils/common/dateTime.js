function isValidISODate(dateString) {
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && dateString === date.toISOString();
}

function parseCustomDate(dateString) {
  const day = dateString.slice(0, 2);
  const month = dateString.slice(2, 4);
  const year = dateString.slice(4, 8);

  // Construct date in YYYY-MM-DD format
  return `${year}-${month}-${day}`;
}

module.exports = {
  isValidISODate,
  parseCustomDate,
};
