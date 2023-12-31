# Dockerfile
# lwjmzla/base-container-node14镜像（也有node16的镜像）已提前安装node14  cnpm  pm2  pnpm@7.26.2  vim，
FROM registry.cn-hangzhou.aliyuncs.com/lwjmzla/base-container-node14:1.0
# 工作目录 app
WORKDIR /app
# . 代表当前目前全部文件(配合.dockerignore过滤)  复制到 app目录
COPY . /app

# 构建镜像时，一般用于做一些系统配置，安装必备的软件。可有多个 RUN
# 设置时区
# RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone
# 安装
# RUN npm install -g cnpm --registry=https://registry.npmmirror.com && cnpm i -g pm2 && npm config set registry https://registry.npmmirror.com && pm2 install pm2-logrotate
RUN cnpm i

# 启动容器时执行，CMD最后的命令要求是 阻塞控制台的程序，这样容器才会持续地执行，类似监听日志那种，而不是npm run test，执行完毕就结束了。
CMD echo $BUILD_ENV && npm run prd-dev && npx pm2 logs

# 环境变量process.env.BUILD_ENV
ENV BUILD_ENV="dev"