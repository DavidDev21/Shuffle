// config.js holds configuration settings for various of things
// port = the port that the server listens on
// db = all the db connection information
// idk
module.exports = {
    port: process.env.PORT || 5000,
    db: {
        database: process.env.DB_NAME || 'shuffle',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'password',
        options: {
            dialect: process.env.DIALECT || 'postgres',
            host: process.env.HOST || 'localhost',
        }
    }
}