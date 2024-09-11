const { createLogger, format, transports } = require("winston");
const { combine, timestamp, json, colorize, printf } = format;

// Custom format for console logging with colors
const consoleLogFormat = format.combine(
  format.colorize(),
  format.printf(({ level, message, timestamp }) => {
    return `${level}: ${message}: ${timestamp}`;
  })
);

// Create a Winston logger
const logger = createLogger({
  level: "info",// there are many more levels, but it will only log info and above to it.
  format: combine(colorize(), timestamp(), json()),//wrap the result in this format
  transports: [
    new transports.Console({
      format: consoleLogFormat,
    }),
    new transports.File({ filename: "app.log" }),
  ],
});

module.exports= logger;