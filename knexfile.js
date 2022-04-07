// Update with your config settings.

module.exports = {

 /* development: {
    client: 'mysql',
    connection: {
    host : '127.0.0.1',
    user : 'root',
    password : '99048902',
    database : 'gettattoo'
    },
    migrations: {
      directory: './src/database/migrations'
    },
  },
*/

development: {
  client: 'mysql',
  connection: {
  host : 'gettattoo.mysql.dbaas.com.br',
  user : 'gettattoo',
  password : 'GetTattoo1357',
  database : 'gettattoo'
  },
  pool: {
      min: 0,
      max: 10
    },
  migrations: {
    directory: './src/database/migrations'
  },
},

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
    host : 'gettattoo.mysql.dbaas.com.br',
    user : 'gettattoo',
    password : 'GetTattoo1357',
    database : 'gettattoo'
    }
  }

};
