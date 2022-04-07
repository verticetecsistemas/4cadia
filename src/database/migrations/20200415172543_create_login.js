
exports.up = function(knex) {
    return knex.schema.createTable('login_tatuador', function (table) {
        table.string('id_login').primary();
        table.string('email_login').notNullable();
        table.string('senha_login').notNullable();
    });
  
};

exports.down = function(knex) {
    return knex.schema.droptable('login_tatuador'); 
  
};
