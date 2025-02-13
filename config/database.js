const Sequelize = require('sequelize');
const mysql = require('mysql2');

const connection = new Sequelize('guiaperguntas', 'root', '1234', {
    host: "localhost",
    dialect: 'mysql'
});


// CREATE TABLE `pergunta` (
//     `id` int(11) NOT NULL AUTO_INCREMENT,
//     `titulo` varchar(255) NOT NULL,
//     `descricao` text NOT NULL,
//     `createdAt` datetime NOT NULL,
//     `updatedAt` datetime NOT NULL,
//     PRIMARY KEY (`id`)
//   )

module.exports = connection;