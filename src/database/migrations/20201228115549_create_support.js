
exports.up = function(knex) {

    return knex.schema.createTable('suporte', function (table) {
        table.string('id_suporte').primary();
        table.string('usuario').notNullable();
        table.string('tipo_problema').notNullable();
        table.string('descricao_problema').notNullable();
             
    });
  
};

exports.down = function(knex) {
    return knex.schema.droptable('suporte'); 
};
