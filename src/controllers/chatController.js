const connection = require('../database/connection');

module.exports  = {

    async create(request, response) {

        const { token_suporte, usuario, mensagem, not_tattoo } = request.body;
        const token_usuario = request.headers.authorization;

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

        await connection('suporte_chat').insert({

            token_suporte,
            token_usuario,
            usuario,
            cor,
            mensagem,
            data,
            hora           

        })

        await connection('suporte')
        .where('token_suporte', token_suporte)
        .update({ not_tattoo });


        return response.json(mensagem);

    },


    async indexChat(request, response) {

        const token_suporte = request.headers.authorization;

        const dadosChat = await connection('suporte_chat').where('token_suporte', token_suporte)
        .select('*');

        return response.json(dadosChat);

  },

  
  async update(request, response) {

    const token_suporte = request.headers.authorization;
    const { token, lida_cliente, not_cliente } = request.body;


     await connection('suporte_chat')
    .where('token_suporte', token_suporte)
    .update({

      lida_cliente

    });

    await connection('suporte')
    .where('token_suporte', token_suporte)
    .andWhere('token', token)
    .update({
      
      not_cliente

    });


    const lida = await connection('suporte_chat')    .where('token_suporte', token_suporte)
    .andWhere('token_usuario', token)
    .select('lida_cliente');

    return response.json(lida);

  }


};