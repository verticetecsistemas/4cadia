const connection = require('../database/connection');
const crypto = require('crypto');
module.exports = {

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

const login = await connection('login_tatuador')
.where('email_login', email_login)
.andWhere('senha_login', senha_login)
.select('token')
.first();

if (!login) {
return response.status(400).json({ error: 'Esse perfil não existe!' });
}

return response.json(login);
},

async index(request, response) {
const token = request.headers.authorization;

const dados = await connection('dados_tatuador').where('token', token).select('*');

return response.json(dados);

},


async update(request, response) {

const token_put = request.headers.authorization;
const { nome, nome_instagram, numero, estado, cidade, especialidade, bio } = request.body;



const convert1 = numero.replace("(", "");
const convert2 = convert1.replace(")", "");
const convert3 = convert2.replace(" ", "");
const convert4 = convert3.replace("-", "");

const celular = '55'+convert4;



await connection('dados_tatuador')
.where('token', token_put)
.update({

nome,
nome_instagram,
celular,
estado,
cidade,
especialidade,
bio,

});

const dados_put = await connection('dados_tatuador').where('token', token_put)
.select('nome','nome_instagram','celular','estado','cidade','especialidade','bio');

return response.json(dados_put);

},

async updateCard(request, response) {

const token_put2 = request.headers.authorization;
const { cpf, nome_cartao, rua, complemento, bairro, ddd, cep, 
numero_cartao, bandeira, codigo_seguranca, validade_cartao, data_nascimento, numero_casa } = request.body;

//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//

// Criptografando dados do cartão do usuário

const random = process.env.RANDOM_KEY;
const iv = process.env.IV_KEY;

var encrypt = ((val) => {
let cipher = crypto.createCipheriv('aes-256-cbc', random, iv);
let encrypted = cipher.update(val, 'utf8', 'base64');
encrypted += cipher.final('base64');
return encrypted;
}); 

var numero_card = encrypt(numero_cartao);
var bandeira_card = encrypt(bandeira);
var codigo_card = encrypt(codigo_seguranca);



//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//

await connection('dados_tatuador')
.where('token', token_put2)
.update({

cpf, 
nome_cartao,
numero_card,
bandeira_card,
codigo_card,
validade_cartao,
rua,
complemento,
bairro,        
ddd,
cep,
data_nascimento,
numero_casa


});

const dados_put = await connection('dados_tatuador').where('token', token_put2)
.select('cpf', 'nome_cartao', 'rua', 'complemento', 'bairro', 'ddd', 'cep', 
'numero_card', 'bandeira_card', 'codigo_card', 'validade_cartao', 'data_nascimento');

return response.json(dados_put);

}


}