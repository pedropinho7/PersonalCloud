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
    host: 'database-1.c7rbfya9uhqu.us-east-1.rds.amazonaws.com',
    //host: 'localhost',
    //host: 'host.docker.internal',
    user: 'admin',
    password: '0MmDpK327MuyDCcXyS0s',
    database: 'personalcloud'
};

const db = new Database(dbConfig);
module.exports = db;