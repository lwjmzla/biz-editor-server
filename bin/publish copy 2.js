const fs = require("fs");
const path = require("path");
const { Client } = require("ssh2");

const envFilePath = `.env.${process.env.NODE_ENV || "development"}`;
require("dotenv").config({ path: envFilePath });

console.log(process.env.DB);

// 项目构建
const { execSync } = require("child_process");

// execSync('npm run build', { stdio: 'inherit' })

// SSH连接配置
const sshConfig = {
  host: process.env.HOST || "119.29.170.43",
  port: process.env.SSHPORT || 22,
  username: process.env.USER || "root",
  privateKey:
    process.env.SSHKEY ||
    fs.readFileSync(path.join(__dirname, "..", "id_rsa")).toString(),
};

// 本地目录路径和远程目录路径
const localDir = __dirname;
const remoteDir = "/home/work/biz-editor-server";

function execAsync(conn, cmdStr) {
  return new Promise((resolve, reject) => {
    conn.exec(cmdStr, (err, stream) => {
      if (err) throw err;
      stream
        .on("close", (code, signal) => {
          console.log(`Stream :: close :: code: ${code}, signal: ${signal}`);
          resolve();
        })
        .on("data", (data) => {
          console.log(`STDOUT: \n${data}`);
        })
        .stderr.on("data", (data) => {
          // !标准错误
          console.log(`STDERR: ${data}`);
        });
    });
  });
}

// 创建SSH连接
const conn = new Client();
const exec = (cmdStr) => execAsync(conn, cmdStr);
// 监听ready事件
conn
  .on("ready", async () => {
    console.log("SSH连接成功");
    try {
      // !执行SSH命令
      await exec(`docker ps`);
      await exec(`cd /home/work/biz-editor-server`);
      console.log(111111);
      await exec("ls");
      console.log(22222);
      conn.end();
    } catch (error) {
      console.log(error);
    }
  })
  .connect(sshConfig);

// 监听error事件
conn.on("error", (err) => {
  console.error("SSH连接失败", err);
});

// 结束SSH连接
conn.on("end", () => {
  console.log("SSH连接已断开");
});
