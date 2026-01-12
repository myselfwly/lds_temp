import fs from "fs/promises";
import path from "path";
import { createLogger } from "vite";

const logger = createLogger();
const loggerInfo = logger.info;
const LOG_DIR = path.resolve(process.cwd(), "pm2Logs");
const LOG_FILE = path.join(LOG_DIR, "vite.log");

// Ensure log directory exists
async function ensureLogDir() {
  try {
    await fs.mkdir(LOG_DIR, { recursive: true });
  } catch (error) {
    console.error("Failed to create log directory:", error);
  }
}

function formatDate(date: Date) {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

// Clear log file on startup
async function clearLogFile() {
  try {
    await fs.writeFile(LOG_FILE, "");
  } catch (error) {
    console.error("Failed to clear log file:", error);
  }
}

ensureLogDir().then(clearLogFile);

logger.info = async (msg, options) => {
  try {
    const timestamp = formatDate(new Date());
    await fs.appendFile(LOG_FILE, `${timestamp}: ${msg}\n`);
  } catch (error) {
    console.error("Failed to write to log file:", error);
  }
  loggerInfo(msg, options);
};

export default logger;
