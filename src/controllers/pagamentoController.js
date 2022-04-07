const connection = require('../database/connection');
const axios = require('axios');
const qs = require('qs');
const crypto = require('crypto');



module.exports = {


async plan(request, response) {


var data = '<?xml version="1.0" encoding="ISO-8859-1" standalone="yes"?>\r\n<preApprovalRequest>\r\n<preApproval>\r\n<name>GetTattoo</name>\r\n<reference>1</reference>\r\n<charge>AUTO</charge>\r\n<period>MONTHLY</period>\r\n<amountPerPayment>39.90</amountPerPayment>\r\n</preApproval>\r\n</preApprovalRequest>';


var config = {
method: 'post',
url: `${process.env.URL_SANDBOX}pre-approvals/request/?email=${process.env.EMAIL_SANDBOX}&token=${process.env.TOKEN_SANDBOX}`,
headers: { 
'Accept': 'application/vnd.pagseguro.com.br.v3+xml;charset=ISO-8859-1', 
'Content-Type': 'application/xml;charset=ISO-8859-1'
},
data : data
};

axios(config)
.then(function (res) {
const planCreate = JSON.stringify(res.data);
console.log(planCreate);
response.json(planCreate)
})
.catch(function (error) {
console.log(error);
response.json(error)
});

},

//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//

async pay(request, response) {

const { nome_cartao, email, rua, complemento, bairro, numero_casa, ddd, cep, estado, cidade, numero, 
validade_cartao, numero_cartao, bandeira, codigo_seguranca, cpf, data_nascimento } =  await request.body;

const cel = numero.substr(5);
const celular = cel.replace("-", "");
const documento = cpf.replace(/[\.-]/g, "");
const codPostal = cep.replace("-", "");


const expirationMonth = validade_cartao.split("/")[1];
const expirationYear = validade_cartao.split("/")[2];



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

//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//

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

//console.log(tokenCard);
//response.json({cardToken: tokenCard});

//console.log(ddd);


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


//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//


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

const cod = JSON.stringify(res.data);

//console.log(cod);
response.json({sucesso: cod});


})
.catch(function (error) {

if (error.response) {
console.log(error.response.data);
console.log(error.response.status);
console.log(error.response.headers);

response.json({falha: error.response.data});

} else if (error.request) {          
console.log(error.request);
response.json({falha: error.request});
} else {
// Something happened in setting up the request and triggered an Error
console.log('Error', error.message);
response.json({falha: error.message});
}

});



})
.catch(function (error) {
console.log(error);
response.json(error);
});



//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//


})
.catch(function (error) {
console.log(error);
response.json(error)
});




/*





var dataCharge = '<payment>\r\n\t<items>\r\n\t\t<item>\r\n\t\t\t<id>001</id>\r\n\t\t\t<description>GetTattoo</description>\r\n\t\t\t<amount>100.00</amount>\r\n\t\t\t<quantity>1</quantity>\r\n\t\t</item>\r\n\t</items>\r\n\t<reference>1</reference>\r\n\t<preApprovalCode>1DBD4478E8E83DD114410FB0EE785CD5</preApprovalCode>\r\n</payment> ';


var configCharge = {
method: 'post',
url: 'https://ws.sandbox.pagseguro.uol.com.br/pre-approvals/payment?email=lucas_aniceto1@hotmail.com&token=C6A4146D8A2A4AED8DF0D925E43FAF23',
headers: { 
'Content-Type': 'application/json', 
'Accept': 'application/vnd.pagseguro.com.br.v3+json;charset=ISO-8859-1'
},
data : dataCharge
};



axios(configCharge)
.then(function (res) {
console.log(JSON.stringify(res.data));
response.json(res.data); 
})
.catch(function (error) {
console.log(error);
response.json(error);
});

*/

},

//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//

async disable(request, response) {

const token = request.headers.authorization; 

const planCod = await connection('dados_tatuador').where('token', token).select('codigo_adesao');

const codigo = planCod[0].codigo_adesao;  

var data = JSON.stringify({
"status": "SUSPENDED"
});

var config = {
method: 'put',
url: `${process.env.URL_SANDBOX}pre-approvals/${codigo}/status?email=${process.env.EMAIL_SANDBOX}&token=${process.env.TOKEN_SANDBOX}`,
headers: { 
'Content-Type': 'application/json', 
'Accept': 'application/vnd.pagseguro.com.br.v3+json;charset=ISO-8859-1'
},
data : data
};

axios(config)
.then(function (res) {
console.log(JSON.stringify(res.data));
response.json({sucesso: res.data});

})
.catch(function (error) {
if (error.response) {
console.log(error.response.data);
console.log(error.response.status);
console.log(error.response.headers);

response.json({falha: error.response.data});

} else if (error.request) {          
console.log(error.request);
response.json({falha: error.request});
} else {
// Something happened in setting up the request and triggered an Error
console.log('Error', error.message);
response.json({falha: error.message});
}
});

},

//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//

async enable(request, response) {

const token = request.headers.authorization; 

const planCod = await connection('dados_tatuador').where('token', token).select('codigo_adesao');

const codigo = planCod[0].codigo_adesao; 

var data = JSON.stringify({
"status": "ACTIVE"
});

var config = {
method: 'put',
url: `${process.env.URL_SANDBOX}pre-approvals/${codigo}/status?email=${process.env.EMAIL_SANDBOX}&token=${process.env.TOKEN_SANDBOX}`,
headers: { 
'Content-Type': 'application/json', 
'Accept': 'application/vnd.pagseguro.com.br.v3+json;charset=ISO-8859-1'
},
data : data
};

axios(config)
.then(function (res) {
console.log(JSON.stringify(res.data));
response.json({sucesso: res.data});

})
.catch(function (error) {
if (error.response) {
console.log(error.response.data);
console.log(error.response.status);
console.log(error.response.headers);

response.json({falha: error.response.data});

} else if (error.request) {          
console.log(error.request);
response.json({falha: error.request});
} else {
// Something happened in setting up the request and triggered an Error
console.log('Error', error.message);
response.json({falha: error.message});
}
});

},

//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//

async change(request, response) {

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
const codigo_adesao = pay[0].codigo_adesao;

//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//

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

//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//

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

//------------------------------------------------------------------------------------------------------//

axios(configCard)
.then(function (res) {

const token1 = JSON.stringify(res.data);
const token2 = token1.replace('{"token":"', '');
const token3 = token2.replace('"}', '');
const tokenCard = token3;

var dataChage = JSON.stringify({
"type": "CREDITCARD",
"sender": {
"hash": "88775b5906cfba47886c0883a9b761097cb3d1f8455837c1eea4b9f7f1544b28"
},
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
});

var configChage = {
method: 'put',
url: `${process.env.URL_SANDBOX}pre-approvals/${codigo_adesao}/payment-method?email=${process.env.EMAIL_SANDBOX}&token=${process.env.TOKEN_SANDBOX}`,
headers: { 
'Content-Type': 'application/json', 
'Accept': 'application/vnd.pagseguro.com.br.v3+json;charset=ISO-8859-1'
},
data : dataChage
};

//------------------------------------------------------------------------------------------------------//

axios(configChage)
.then(function (res) {

return response.json('Dados Alterados!');

}).catch(function (error) {
console.log(error.response.data);
console.log(error.response.status);
return response.json(error.response.data);
});

//------------------------------------------------------------------------------------------------------//

}).catch(function (error) {
console.log(error);
});

//------------------------------------------------------------------------------------------------------//

}).catch(function (error) {
console.log(error);
});

//------------------------------------------------------------------------------------------------------//

}).catch(function (error) {
console.log(error);
});

},

//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//

async status(request, response) {

const tk = request.headers.authorization;

async function selAdesao() {

var selAdesao =  await connection('dados_tatuador')
.where('token', tk)
.select('codigo_adesao');

return selAdesao;

}

selAdesao().then(ades => {

var codigo_adesao = ades[0].codigo_adesao;

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

async function putStatus() {

var putStatus =  await connection('dados_tatuador')
.where('token', tk)
.update({

status_adesao

});

return putStatus;

}

putStatus().then(st => {

response.json(status_adesao);

}).catch(function (error) {
console.log(error);
});

//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//

}).catch(function (error) {
console.log(error);
});

//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//

}).catch(function (error) {
    console.log(error);
    });

}



}