const mysql = require("mysql2");
const { db_host, db_port, db_name, db_user, db_password } = require("../config.json");

const connect = mysql.createConnection({
    host: db_host,
    user: db_user,
    database: db_name,
    password: db_password,
    port: db_port
}).promise();

module.exports = { connect };

