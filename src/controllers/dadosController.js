const connection = require('../database/connection');
const crypto = require('crypto');
//const axios = require('axios');

module.exports  = {

async create(request, response) {


const { nome, nome_instagram, numero, estado, cidade, especialidade, bio, cpf, 
nome_cartao, email, rua, complemento, bairro, numero_casa, ddd, cep, 
numero_cartao, bandeira, codigo_seguranca, validade_cartao, data_nascimento  } = request.body;
const token = request.headers.authorization;

const convert1 = numero.replace("(", "");
const convert2 = convert1.replace(")", "");
const convert3 = convert2.replace(" ", "");
const convert4 = convert3.replace("-", "");

const celular = '55'+convert4;

//------------------------------------------------------------------------------------------------------//
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

// PEGA STATUS DE ADESÃO E SALVA NO BANCO
/*
var configStatus = {
method: 'get',
url: `${process.env.URL_SANDBOX}pre-approvals/${codigo_adesao}?email=${process.env.EMAIL_SANDBOX}&token=${process.env.TOKEN_SANDBOX}`,
headers: { 
'Content-Type': 'application/json', 
'Accept': 'application/vnd.pagseguro.com.br.v3+json;charset=ISO-8859-1'
}
};

axios(configStatus)
.then(function (res) {

var status_adesao = JSON.stringify(res.data);


// INSERIR TODO O CÓDIGO DE INCLUSÃO AQUI

}).catch(function (error) {
console.log(error);
});

*/

//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//




await connection('dados_tatuador').insert({

nome,
nome_instagram,
celular,
estado,
cidade,
especialidade,
bio,
cpf,
token,
nome_cartao, 
numero_card,
bandeira_card,
codigo_card,
validade_cartao,
email, 
rua, 
complemento, 
bairro, 
numero_casa, 
ddd, 
cep, 
data_nascimento
//codigo_adesao
//status_adesao

})

await connection('login_tatuador').update({ nome }).where('token', token);

return response.json({sucesso: 'Dados Criados!'});


},

async index(request, response) {

const listar = await connection('dados_tatuador')
.select('*');

return response.json(listar);

},


async get(request, response) {

const { esp } = request.body;
const city = request.headers.authorization;


if(esp == '' || esp == 'TODAS') {

const [count] = await connection('dados_tatuador').where('cidade', city).andWhere('status_adesao', '=', 'ACTIVE').count();

const listar = await connection('dados_tatuador')
.where('cidade', city)
.andWhere('status_adesao', '=', 'ACTIVE')
.select('*');

response.header('X-Total-Count', count['count(*)']);

return response.json(listar);

} else {

const [count] = await connection('dados_tatuador').where('cidade', city).andWhere('especialidade', esp).andWhere('status_adesao', '=', 'ACTIVE').count();

const listar = await connection('dados_tatuador')
.where('cidade', city)
.andWhere('especialidade', esp)
.andWhere('status_adesao', '=', 'ACTIVE')
.select('*');

response.header('X-Total-Count', count['count(*)']);

return response.json(listar);

}



},


async update(request, response) {

const token = request.headers.authorization;
const { click } = request.body;

await connection('dados_tatuador')
.where('token', token)
.update({

click

});

const numero = await connection('dados_tatuador').where('token', token).select('click');

return response.json(numero);

}

};