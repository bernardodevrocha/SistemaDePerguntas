const Sequelize = require('sequelize');
const mysql = require('mysql2');

const connection = new Sequelize('guiaperguntas', 'root', '1234', {
    host: "localhost",
    dialect: 'mysql'
});

module.exports = connection;