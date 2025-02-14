const express = require("express");
const app = express();
const bodyparser = require('body-parser');
const connection = require('./config/database');
const perguntaModel = require('./config/Pergunta');
const Resposta = require('./config/resposta');

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
    perguntaModel.findAll({raw: true, order: [
        ['id','DESC'] // ASC = Crescente || DESC = Decrecente
    ]}).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        })
    })
});

app.get('/pergunta', (req, res) => {
    res.render('perguntar')
})

app.post('/salvarpergunta', (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    perguntaModel.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect('/');
    });
})

app.get('/pergunta/:id', (req, res) => {
    var id = req.params.id;
    perguntaModel.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){

            Resposta.findAll({
                where: {perguntaId: pergunta.id}
            }).then(respostas => {
                res.render('pergunta', {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });

        }else{
            res.redirect('/');
        };
    });
});

app.post('/responder', (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect('/pergunta/'+perguntaId);
    });
});

app.listen(3000, ()=>{
    console.log("App rodando");
    console.log("http://localhost:3000");
});