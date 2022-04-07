const connection = require('../database/connection');
const crypto = require('crypto');

module.exports  = {

async create(request, response) {

const { usuario, tipo_problema, descricao_problema } = request.body;
const token = request.headers.authorization;

const cor = '#000000';

const dt = new Date();
const barra = '/';
const pontos = ':';

const dias     = dt.getDate();           // 1-31
const meses     = dt.getMonth()  + 1;          // 0-11 (zero=janeiro)
const anos    = dt.getFullYear();       // 4 dígitos

const dia = dias.toString().padStart(2, '0');
const mes = meses.toString().padStart(2, '0');
const ano = anos.toString().padStart(4, '0');

const data = `${dia}${barra}${mes}${barra}${ano}`;    // Concatena tudo e forma a data atual


const horarios = dt.getHours();
const minutos = dt.getMinutes();
const segundos = dt.getSeconds();

const minuto = minutos.toString().padStart(2, '0');
const horario = horarios.toString().padStart(2, '0');
const segundo = segundos.toString().padStart(2, '0');

const hora = `${horario}${pontos}${minuto}${pontos}${segundo}`;

const token_suporte = crypto.randomBytes(4).toString('HEX');

await connection('suporte').insert({

token_suporte,
usuario,
tipo_problema,
descricao_problema,
data,
hora,
token,

})

await connection('suporte_chat').insert({

token_suporte,
token_usuario: token,
cor,
usuario,
mensagem: descricao_problema,
data,
hora,

})

return response.json({token: token_suporte});

},

async index(request, response) {

const token = request.headers.authorization;

const listar = await connection('suporte')
.select('*')
.where('token', token);

return response.json(listar);

},


};