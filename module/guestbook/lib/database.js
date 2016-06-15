var mysql = require('mysql');
var winston = require('winston');

var common = require('../../../core/lib/common');
var misc = require('../../../core/lib/misc');

// var tables = misc.databaseTable();
var tables = {
    guestbook: 'b_guestbook'
};

function deleteScheme(databaseConfiguration, callback) {
    var connection = mysql.createConnection({
        host: databaseConfiguration.dbHost,
        port: databaseConfiguration.dbPort || common.databaseDefault.port,
        database: databaseConfiguration.dbName || common.databaseDefault.database,
        user: databaseConfiguration.dbUserID,
        password: databaseConfiguration.dbUserPassword
    });

    var sql = "DROP TABLE IF EXISTS ??";
    var tables = [tables.guestbook];

    connection.query(sql, tables, function (error, results, fields) {
        connection.destroy();
        callback(databaseConfiguration);
    });
}

function createScheme(databaseConfiguration) {
    var connection = mysql.createConnection({
        host: databaseConfiguration.dbHost,
        port: databaseConfiguration.dbPort || common.databaseDefault.port,
        database: databaseConfiguration.dbName || common.databaseDefault.database,
        user: databaseConfiguration.dbUserID,
        password: databaseConfiguration.dbUserPassword
    });

    var sql_guestbook = 'CREATE TABLE IF NOT EXISTS ?? ' +
        '(`id` int unsigned not null AUTO_INCREMENT PRIMARY KEY, ' +
        '`email` varchar(64) not null, `password` varchar(255) not null, ' +
        '`nickname` varchar(64), ' +
        '`flag` varchar(1), ' +
        '`message` text, ' +
        '`reply` text, ' +
        '`created_at` datetime, ' +
        '`replied_at` datetime)';

    connection.query(sql_guestbook, tables.guestbook, function (error, result) {
        // close connection
        connection.destroy();
    });
}

module.exports = {
    deleteScheme: deleteScheme,
    createScheme: createScheme,
    option: {
        tables: tables
    }
};