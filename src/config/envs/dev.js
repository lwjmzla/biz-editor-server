module.exports = {
  // mysql 连接配置
  mysqlConf: {
    host: '127.0.0.1',
    user: 'root',
    password: '123',
    port: '3306',
    database: 'lego_course',
  },

  // mongodb 连接配置
  mongodbConf: {
    host: '127.0.0.1',
    port: '27017',
    dbName: 'lego_course',
  },

  // redis 连接配置
  redisConf: {
    port: '6379',
    host: '127.0.0.1',
    // password: 'abc123',
  },
}
