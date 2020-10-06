const { body, validationResult } = require('express-validator');
const { userValidation, validation } = require('../utils/validator');


// Iniciando o banco de Dados com o NeDB.
let Datastore = require('nedb');
let dataBase = new Datastore({
    filename: 'datafile.db',
    autoload: true

});

// Exporta os dados deste arquivo atraves do modulo module.exports e recebe o app atraves de uma função.
module.exports =  app => {

    // Variavel para criar uma rota padrão.
    let route = app.route('/users');
    
    //Cria uma rota utilizando o metodo GET.
    route.get((req, res) => {
        dataBase.find({}).sort({name:1}).exec((error, users) => {
            if(error){
                app.utils.error.send(error, req, res)

            }else{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    users
                });

                console.log('URL:', req.url);
                console.log('METHOD:', req.method);
            }
        }); 
        
    });

    // Cria uma rota utilizando o metodo POST
    route.post(userValidation(), validation, (req, res) => {
        
        // A rota já faz a validação através das propriedades: userValidation, validation, antes de inserir os dados na no dataBase.
        
        dataBase.insert(req.body, (error, user) => {
            if(error) {
                app.utils.error.send(error, req, res); 
            }else{
                res.status(200).json(user)
            }
        }); 
    });
    
    let routeId = app.route('/users/:id');

    routeId.get((req, res) => {

        dataBase.findOne({_id:req.params.id}).exec((error, user) => {
            if(error){
                app.utils.error.send(error, req, res);
            
            }else{
                res.status(200).json(user);
            }
        })
    })
    routeId.put(userValidation(), validation, (req, res) => {
        dataBase.update({_id:req.params.id}, req.body, error => {
            if(error){
                app.utils.error.send(error, req, res);
            
            }else{
                res.status(200).json(Object.assign(req.params, req.body));
            }
        });
    });
    routeId.delete((req, res) => {
        dataBase.remove({_id: req.params.id}, {}, error => {
            if(error){
                app.utils.error.send(error, req, res);
            }else{
                res.status(200).json(req.params);
            }
        });
    });
}


// // Importa o express neste arquivo.
// let express = require('express');

// // Recurso de rotas da biblioteca do express
// let routes = express.Router();
