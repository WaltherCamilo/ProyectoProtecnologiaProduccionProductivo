const sql = require('mssql');

const config = {
    user: 'api_user',
    password: 'Colombia2026*',
    server: 'localhost',
    database: 'Informe',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

module.exports = { sql, config };