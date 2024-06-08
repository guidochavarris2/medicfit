const { Pool } = require('pg');


//credenciales de una base de datos posgresql alojado en clever cloud.
const pool = new Pool({
    user: 'uiyxc8tbe8itgobs0hus',
    host: 'bksjobzuykkfmz4rs1ph-postgresql.services.clever-cloud.com',
    database: 'bksjobzuykkfmz4rs1ph',
    password: 'cWKOqHipgww1ELGhrcu2jM5YZeYZid',
    port: 50013,
});

module.exports = pool;
