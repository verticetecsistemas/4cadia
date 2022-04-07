const connection = require('../database/connection');
const crypto = require('crypto');

module.exports  = {

async create(request, response) {

const { email_login, senha } = request.body;

const random = process.env.RANDOM_KEY;
const iv = process.env.IV_KEY;


var encrypt = ((val) => {
let cipher = crypto.createCipheriv('aes-256-cbc', random, iv);
let encrypted = cipher.update(val, 'utf8', 'base64');
encrypted += cipher.final('base64');
return encrypted;
}); 

const senha_login = encrypt(senha);


const tatuador = await connection('login_tatuador')
.where('email_login', email_login)
.first();

if(!tatuador) {
const token = crypto.randomBytes(8).toString('HEX');
const token_senha = token;

await connection('login_tatuador').insert({

token,
token_senha,
email_login,
senha_login,
})


return  response.json({texto: "Foi Cadastrado com Sucesso!"});

} else {



return response.json({texto: "já possui um cadastro! Tente novamente com outro endereço de E-mail ou altere sua senha."});

}

},




async index(request, response) {
const nome_login = request.headers.authorization;

const dados = await connection('login_tatuador').where('email_login', nome_login).select('*');

return response.json(dados);

},


async update(request, response) {
const token_put = request.headers.authorization;
const { senha } = request.body;
const token = await connection('login_tatuador').where('token_senha', token_put).select('token'); 

const random = process.env.RANDOM_KEY;
const iv = process.env.IV_KEY;

var encrypt = ((val) => {
let cipher = crypto.createCipheriv('aes-256-cbc', random, iv);
let encrypted = cipher.update(val, 'utf8', 'base64');
encrypted += cipher.final('base64');
return encrypted;
}); 

const senha_login = encrypt(senha);


const tokenObj = Object.values(JSON.parse(JSON.stringify(token)));
const token_senha = tokenObj.map(v => (v.token)).toString();



await connection('login_tatuador')
.where('token_senha', token_put)
.update({

senha_login,
token_senha

});

const pass = await connection('login_tatuador').where('token', token_put).select('senha_login');

return response.json(pass);

},


async get(request, response) {


const dd = await connection('login_tatuador').select('*');

return response.json(dd);

},


async up(request, response) {
const token = request.headers.authorization;
const { desativado, motivo_desativado } = request.body;

await connection('login_tatuador')
.where('token', token)
.update({

desativado,
motivo_desativado

});

const pass = await connection('login_tatuador').where('token', token).select('desativado');

return response.json(pass);

},

async tkSenha(request, response) {
const tk = request.headers.authorization;


const { numero } = request.body; 

//const teste = parseInt(numero);

//console.log(teste);

const token_senha = crypto.randomBytes(numero).toString('HEX');

//console.log(token_senha);

await connection('login_tatuador')
.where('token', tk)
.update({

token_senha,

});

const tk_senha = await connection('login_tatuador').where('token', tk).select('token_senha');

return response.json(tk_senha);

}



};