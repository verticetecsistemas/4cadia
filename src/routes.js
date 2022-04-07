const express = require('express');
//const multer = require('multer');
const loginController = require('./controllers/loginController');
const dadosController = require('./controllers/dadosController');
const perfilController = require('./controllers/perfilController');
const suporteController = require('./controllers/suporteController');
const emailController = require('./controllers/emailController');
const listaController = require('./controllers/listaController');
const avatarController = require('./controllers/avatarController');
const localController = require('./controllers/localController');
const pagamentoController = require('./controllers/pagamentoController');
const pagamentoProvisional = require('./controllers/pagamentoProvisional');

const listaSuporteController = require('./controllers/listaSuporteController');
const chatController = require('./controllers/chatController');


const routes = express.Router();

//Rotas de Login do Tatuador
routes.post('/login', loginController.create); 
routes.get('/login', loginController.index);
routes.put('/login', loginController.update); 
routes.get('/get', loginController.get); 
routes.put('/update', loginController.up); 
routes.put('/tokenSenha', loginController.tkSenha);

//Rotas de dados do Tatuador
routes.post('/dados', dadosController.create);
routes.get('/dados', dadosController.index);
routes.post('/data', dadosController.get);
routes.put('/dados', dadosController.update);

//Rotas de Perfil do Tatuador
routes.post('/acesso', perfilController.create);
routes.get('/perfil', perfilController.index);
routes.put('/altera', perfilController.update);
routes.put('/alteraCard', perfilController.updateCard);


//Rotas de Suporte
routes.post('/suporte', suporteController.create);
routes.get('/suporte', suporteController.index);


// Rotas de email
routes.post('/email', emailController.create);

// Rota para Listagem de Dados por Token
routes.get('/lista', listaController.index);

// Rota para upload de Avatar
//routes.get('/uploader', avatarController.index);
routes.post('/upload', avatarController.create);
//routes.get('/upload', avatarController.index);

//Rotas de Suporte
routes.get('/estados', localController.index);
routes.get('/cidades', localController.get);


//Rotas de Pagamento
routes.post('/plano', pagamentoController.plan);
routes.post('/adesao', pagamentoController.pay);
routes.put('/suspende', pagamentoController.disable);
routes.put('/ativa', pagamentoController.enable);
routes.put('/modifica', pagamentoController.change);
routes.get('/status', pagamentoController.status);

//Rota de Pagamento Provisório
routes.post('/adesaoProv', pagamentoProvisional.payProv);

//Rotas de Listagem do Suporte
routes.get('/listagem', listaSuporteController.index);
routes.put('/status', listaSuporteController.update);

//Rota para o chat 
routes.post('/chat', chatController.create);
routes.get('/chat', chatController.indexChat);
routes.put('/chat', chatController.update); 


module.exports = routes;

