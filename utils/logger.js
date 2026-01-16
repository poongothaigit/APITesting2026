import { createLogger, format as _format, transports as _transports } from "winston";

export const logger = createLogger({
  level: "info",
  format: _format.combine(
    _format.timestamp(),
    _format.json()
  ),
  transports: [
    new _transports.File({ filename: "logs/execution.log" }),
    new _transports.Console()
  ]
});
