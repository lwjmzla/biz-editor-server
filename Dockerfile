# Dockerfile
FROM node:latest
WORKDIR /app
COPY . /app

# 设置时区
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone
# 安装
RUN npm install -g cnpm --registry=https://registry.npmmirror.com && cnpm i -g pm2
RUN cnpm i

# 启动
CMD npm run prd-dev && npx pm2 log

