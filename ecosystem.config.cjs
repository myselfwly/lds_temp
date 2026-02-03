const baseInfo = require("./encrypt-bundler.lds.config.js");
const port = 8083;
const name = `${baseInfo.fileName}`;
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

/**
 * 获取全局node_modules路径
 */
const getGlobalNodeModulesPath = () => {
  try {
    // 使用npm root -g获取全局node_modules路径
    return execSync("npm root -g").toString().trim();
  } catch (error) {
    console.error("获取全局node_modules路径失败:", error);
    return "";
  }
};
/**
 * 获取当前yarn的路径
 */
const getYarnPath = () => {
  try {
    const globalNodeModulesPath = getGlobalNodeModulesPath();
    // 判断是否存在yarn.js
    const yarnPath = path.join(globalNodeModulesPath, "yarn", "bin", "yarn.js");
    if (fs.existsSync(yarnPath)) {
      return yarnPath;
    }
    throw new Error("yarn.js不存在");
  } catch (error) {
    console.error("获取yarn路径失败:", error);
    throw error;
  }
};

const yarnPath = getYarnPath();

module.exports = {
  apps: [
    {
      name,
      script: yarnPath,
      args: ` dev --port ${port} `,
      error_file: `pm2Logs/${name}-out.log`,
      out_file: `pm2Logs/${name}-out.log`,
      log_date_format: "YYYY-MM-DD HH:mm",
      exec_mode: "cluster",
      instances: 1,
      autorestart: false,
      watch: false,
      max_memory_restart: "1G",
      windowsHide: true,
      env: {
        LOG: "true",
        PORT: port,
      },
    },
  ],
};
