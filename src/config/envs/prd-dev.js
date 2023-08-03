const devConf = require('./dev');

// 修改 redis 连接配置
Object.assign(devConf.redisConf, {
  // 和 docker-compose 中配置的 service 名字一致
  // host: 'editor-redis', // ! 【注意】这种方式相当于跟容器内部直连，所以用内部端口 6379 ，而不是对外端口6378 ，后者是宿主机的端口
  host: 'host.docker.internal', // !这种方式相当于宿主机的IP，所以端口需要外部端口
  port: 6378,
});

// 修改 mongodb 连接配置
Object.assign(devConf.mongodbConf, {
  // host: 'editor-mongo', // 和 docker-compose 中配置的 service 名字一致
  host: 'host.docker.internal',
  port: 27016,
});

// 修改 mysql 连接配置
Object.assign(devConf.mysqlConf, {
  // host: 'editor-mysql', // 和 docker-compose 中配置的 service 名字一致
  host: 'host.docker.internal',
  port: 3305,
});

module.exports = devConf;
