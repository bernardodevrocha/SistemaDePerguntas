const express = require("express");
const app = express();
const bodyparser = require('body-parser');
const connection = require('./config/database');
const perguntaModel = require('./config/Pergunta');

connection
    .authenticate()
    .then(() => {
        console.log('Conexão bem sucedida!');
    })
    .catch((err) => {
        console.log(err);
    });

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.get('/', (req, res) => {
    res.render("index")
});

app.get('/pergunta', (req, res) => {
    res.render('perguntar')
})

app.post('/salvarpergunta', (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send('Formulário recebido! Titulo: ' + titulo + " " + "Descrição: " + descricao);
})

app.listen(3000, ()=>{
    console.log("App rodando");
    console.log("http://localhost:3000");
});