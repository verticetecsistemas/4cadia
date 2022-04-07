
exports.up = function(knex) {
    return knex.schema.createTable('dados_tatuador', function (table) {
        table.string('id_dados').primary();
        table.string('nome').notNullable();
        table.string('nome_instagram').notNullable();
        table.string('email').notNullable();
        table.string('celular').notNullable();
        table.string('especialidade').notNullable();
        table.string('bio').notNullable();

        table.foreign('id_dados').references('id_login').inTable('login_tatuador');
    });
  
};

exports.down = function(knex) {
    return knex.schema.droptable('dados_tatuador'); 
};
