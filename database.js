const mysql = require('mysql2/promise');

class Database {
    constructor(config) {
        this.pool = mysql.createPool(config);
    }

    async query(sql, args) {
        const [results, fields] = await this.pool.execute(sql, args);
        return results;
    }
    
    async endPool() {
        await this.pool.end();
        console.log("Connection pool closed successfully.");
    }
}

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'PPCloudUsers'
};

const db = new Database(dbConfig);

module.exports = db;