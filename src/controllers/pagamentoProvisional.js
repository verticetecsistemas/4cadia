const connection = require('../database/connection');
const axios = require('axios');
const qs = require('qs');
const crypto = require('crypto');

module.exports = {

async payProv(request, response) {

const tk = request.headers.authorization;


async function selPay() {

var selPay =  await connection('dados_tatuador')
.where('token', tk)
.select('*');

return selPay;

}

//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//

selPay().then(pay => {


const nome_cartao = pay[0].nome;
const numero_card = pay[0].numero_card;
const bandeira_card = pay[0].bandeira_card;
const codigo_card = pay[0].codigo_card;
const validade_cartao = pay[0].validade_cartao;
const email = pay[0].email;
const rua = pay[0].rua;
const complemento = pay[0].complemento;
const bairro = pay[0].bairro;
const numero_casa = pay[0].numero_casa;
const ddd = pay[0].ddd;
const cep = pay[0].cep;
const estado = pay[0].estado;
const cidade = pay[0].cidade;
const numero = pay[0].celular;
const cpf = pay[0].cpf;
const data_nascimento = pay[0].data_nascimento;


const celular = numero.substr(-9);
const documento = cpf.replace(/[\.-]/g, "");
const codPostal = cep.replace("-", "");

const expirationMonth = validade_cartao.split("/")[1];
const expirationYear = validade_cartao.split("/")[2];


//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//

// Descriptografando dados do cartão do usuário

const random = process.env.RANDOM_KEY;
const iv = process.env.IV_KEY;

var decrypt = ((encrypted) => {
let decipher = crypto.createDecipheriv('aes-256-cbc', random, iv);
let decrypted = decipher.update(encrypted, 'base64', 'utf8');
return (decrypted + decipher.final('utf8'));
}); 

const numero_cartao = decrypt(numero_card);
const bandeira = decrypt(bandeira_card);
const codigo_seguranca = decrypt(codigo_card);



//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//

var configSession = {
method: 'post',
url: `${process.env.URL_SANDBOX}v2/sessions?email=${process.env.EMAIL_SANDBOX}&token=${process.env.TOKEN_SANDBOX}`,
headers: { 
'Content-Type': 'application/x-www-form-urlencoded'
}
};

axios(configSession)
.then(function (res) {


const regex1 = /<id>(.+?)<\/id>/
const match1 = regex1.exec(res.data);
const sessionId = match1[1];

//console.log(sessionId);
//response.json(sessionId);



var dataCard = qs.stringify({
'sessionId': sessionId,
'amount': '39.90',
'cardNumber': numero_cartao,
'cardBrand': bandeira,
'cardCvv': codigo_seguranca,
'cardExpirationMonth': expirationMonth,
'cardExpirationYear': expirationYear 
});


var configCard = {
method: 'post',
url: 'https://df.uol.com.br/v2/cards',
headers: { 
'Content-Type': 'application/x-www-form-urlencoded'
},
data : dataCard
};

axios(configCard)
.then(function (res) {

const token1 = JSON.stringify(res.data);
const token2 = token1.replace('{"token":"', '');
const token3 = token2.replace('"}', '');
const tokenCard = token3;



var dataPay = JSON.stringify({
"plan": `${process.env.PLAN_SANDBOX}`,
"reference": "1",
"sender": {
"name": nome_cartao,
"email": email,
"hash": "88775b5906cfba47886c0883a9b761097cb3d1f8455837c1eea4b9f7f1544b28",
"phone": {
"areaCode": ddd,
"number": celular
},
"address": {
"street": rua,
"number": numero_casa,
"complement": complemento,
"district": bairro,
"city": cidade,
"state": estado,
"country": "BRA",
"postalCode": codPostal
},
"documents": [
{
"type": "CPF",
"value": documento
}
]
},
"paymentMethod": {
"type": "CREDITCARD",
"creditCard": {
"token": tokenCard,
"holder": {
"name": nome_cartao,
"birthDate": data_nascimento,
"documents": [
{
"type": "CPF",
"value": documento
}
],
"phone": {
"areaCode": ddd,
"number": celular
},
"billingAddress": {
"street": rua,
"number": numero_casa,
"complement": complemento,
"district": bairro,
"city": cidade,
"state": estado,
"country": "BRA",
"postalCode": codPostal
}
}
}
}
}); 


//---------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------//        


var configPay = {
method: 'post',
url: `${process.env.URL_SANDBOX}pre-approvals?email=${process.env.EMAIL_SANDBOX}&token=${process.env.TOKEN_SANDBOX}`,
headers: { 
'Content-Type': 'application/json', 
'Accept': 'application/vnd.pagseguro.com.br.v3+json;charset=ISO-8859-1'
},
data : dataPay
};


axios(configPay)
.then(function (res) { 

const codigo_adesao = res.data.code;

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

var status_adesao = res.data.status;


//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//

async function selStatus() {

var selStatus =  await connection('dados_tatuador')
.where('token', tk)
.update({

codigo_adesao,
status_adesao

});

return selStatus;

}
    
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
    
selStatus().then(st => {

response.json({sucesso: codigo_adesao});

}).catch(function (error) {
console.log(error);
});

//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//

}).catch(function (error) {
console.log(error);
});

//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//

}).catch(function (error) {

if (error.response) {
//console.error(error.response.data);
//console.error(error.response.status);
//console.error(error.response.headers);

response.json({falha: error});

} else if (error.request) {          
console.error(error.request);
response.json({falhaReq: error.request});
} else {
// Something happened in setting up the request and triggered an Error
console.error('Error', error.message);
response.json({falhaMessage: error.message});
}

});

//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//


}).catch(function (error) {
console.log(error);
response.json(error);
});


//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//


}).catch(function (error) {
console.log(error);
response.json(error)
});

//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//

}).catch((error) => {
    console.log(error);
  }); 

}

}