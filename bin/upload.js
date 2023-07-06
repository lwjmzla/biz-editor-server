// import chalk from 'chalk';
// import ora from 'ora';

const fs = require('fs');
const path = require('path');
const { NodeSSH } = require('node-ssh');
const chalk = require('chalk');
const ora = require('ora');
const { execSync } = require('child_process');
const pkg = require('../package.json');

const ssh = new NodeSSH();

const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;
require('dotenv').config({ path: envFilePath });

console.log(process.env.DB);
// 项目构建

// execSync('npm run build', { stdio: 'inherit' })

// SSH连接配置
const sshConfig = {
  host: process.env.HOST || '119.29.170.43',
  port: process.env.SSHPORT || 22,
  username: process.env.USER || 'root',
  privateKey:
    process.env.SSHKEY
    || fs.readFileSync(path.join(__dirname, '..', 'id_rsa')).toString(),
  localFile: path.join(__dirname, '..', 'dist'),
  remoteFile: '/home/test',
};

// 本地目录路径和远程目录路径
const localDir = __dirname;
const remoteDir = '/home/work/biz-editor-server';

function execAsync(sshIns, cmdStr, opts = {}) {
  return new Promise((resolve, reject) => {
    sshIns.execCommand(cmdStr, opts).then((result) => {
      console.log(`STDOUT: \n${result.stdout}`);
      console.log(`STDERR: \n${result.stderr}\n`);
      resolve();
    }).catch((err) => {
      reject(err);
    });
  });
}

const spinner = ora();
spinner.start(chalk.yellow('正在连接服务器'));
const exec = (cmdStr, opts) => execAsync(ssh, cmdStr, opts);
ssh
  .connect({
    host: sshConfig.host,
    username: sshConfig.username,
    privateKey: sshConfig.privateKey,
  })
  .then(async (nodeSSH) => {
    spinner.succeed(chalk.green('服务器连接成功'));
    spinner.start(chalk.blue('开始上传文件'));
    try {
      await nodeSSH.putDirectory(
        sshConfig.localFile,
        sshConfig.remoteFile,
      );
      spinner.succeed(chalk.green('文件上传成功'));
    } catch (err) {
      console.log(chalk.bgRed(err));
      spinner.fail(chalk.red('文件上传失败'));
    }
    nodeSSH.connection?.destroy();
  })
  .catch((err) => {
    console.log(err);
    console.log(chalk.bgRed(err));
  });
