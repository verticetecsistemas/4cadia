const connection = require('../database/connection');

module.exports  = {


    async index(request, response) {

        const token = request.headers.authorization;

        const listar = await connection('dados_tatuador')
        .where('token', token)
        .select('*');
        return response.json(listar);

    }

};