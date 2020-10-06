
// Exporta os dados deste arquivo atraves do modulo module.exports e recebe o app atraves de uma função.
module.exports = app => {

    // Cria uma rota utilizando o metodo Router da biblioteca do express 
    app.get('/',(req, res) => {
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1><center>RESTful API</h1><p> Projeto desenvolvido no Curso Completo de JavaScript da Hcode na Udemy.com </p></center>');
    });
}


// // Importa o express neste arquivo
// let express = require('express');

// // Recurso de rotas da biblioteca do express.
// let routes = express.Router();