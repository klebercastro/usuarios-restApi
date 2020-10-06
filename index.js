// Chama o express e outros modulo atraves do require
const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const {body, validationResult} = require('express-validator');
const assert = require('assert');

let app = express();


// Analisa a aplicação da URL
app.use(bodyParser.urlencoded({extended: false}));
// Converte os dados que body-parser recebe em JSON
app.use(bodyParser.json());

consign().include('routes').include('utils').into(app);

// Escuta a os eventos do endereço que foi passado.
app.listen(8080, '192.168.0.101', () => {
    console.log('Server Running');
});


// Solicita a rota do arquivo que estamos requisitando.
// let routesIndex = require('./routes/index');
// let routesUsers = require('./routes/users');

// Invoca a função express e armazena todos os dados na variavel app

// Passa para a variavel app os arquivos requisitados
// app.use('/', routesIndex);
// app.use('/users', routesUsers);
