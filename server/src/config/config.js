module.exports = {
  database: {
    uri: 'mongodb://localhost:27017/socialorder',
    user: 'dev',
    pass: 'password'
  },
  jwt: {
    secret: 'secret',
    expiration: 604800 // 7 days
  },
  port: 8081
}
