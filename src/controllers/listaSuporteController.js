const connection = require('../database/connection');

module.exports  = {


async index(request, response) {

const token = request.headers.authorization;


const listar = await connection('suporte')
.select('*').where('token', token).orderBy('id_suporte', 'desc');

return response.json(listar);

},


async update(request, response) {

const token_suporte = request.headers.authorization;
const { status } = request.body;

await connection('suporte')
.where('token_suporte', token_suporte)
.update({

status

});

return response.json("Alterado!");

}

};