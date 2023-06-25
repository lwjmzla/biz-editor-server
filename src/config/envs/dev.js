module.exports = {
  // mysql 连接配置
  mysqlConf: {
    host: '121.36.199.250',
    user: 'root',
    password: '123',
    port: '3306',
    database: 'lego_course',
  },

  // mongodb 连接配置
  mongodbConf: {
    host: '121.36.199.250',
    port: '27017',
    dbName: 'newdatabase',
  },

  // redis 连接配置
  redisConf: {
    port: '6379',
    host: '121.36.199.250',
    // password: 'abc123',
  },
}
