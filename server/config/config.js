// config.js holds configuration settings for various of things
// port = the port that the server listens on
// db = all the db connection information

module.exports = {
    port: process.env.PORT || 5000,
    db: {
        database: process.env.DB_NAME || 'shuffle',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        options: {
            dialect: process.env.DIALECT || 'mysql',
            host: process.env.HOST || 'localhost',
        }
    }
}