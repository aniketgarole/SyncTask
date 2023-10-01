const istTimezone = "Asia/Kolkata";
const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: istTimezone,
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
});


module.exports = {formatter}
