const connection = require('../database/connection');

module.exports  = {

async index(request, response) {  

const listarEstados = await connection('estado')     
.select('Id_Estado', 'Uf');


return response.json(listarEstados);

},

async get(request, response) {

const ufRequest = request.headers.authorization;

const listarCidades = await connection('municipio')
.where('Uf', ufRequest)
.select('Id_Municipio', 'Uf', 'Nome');



return response.json(listarCidades);



}

};