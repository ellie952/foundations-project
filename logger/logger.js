const path = require("path");
const winston = require("winston");
const { combine, timestamp, label, prettyPrint } = winston.format;

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        label({ label: "Foundations Project Log" }),
        timestamp(),
        prettyPrint()
    ),
    transports: [
        new winston.transports.File({ filename: path.join(__dirname, '/server.log') }),
        new winston.transports.Console()
    ]
});

module.exports = { logger };