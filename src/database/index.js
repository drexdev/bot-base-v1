const MySQL = require("mysql2/promise");

let queries = {};

const Connection = new MySQL.createPool({
    port: 3306,
    user: "root",
    host: "localhost",
    database: "joao_db",
});

/**
 * @param {string} name - Nome da requisicao;
 * @param {string} query - Query a ser executada;
 */
Connection.prepare = async (name, query) => {
    queries[name] = query;
}

/**
 * @param {string} name - Nome da requisicao;
 * @param {string[]} data - Valores a serem substituidos na query.
 * @returns
 */
Connection.query = async (name, data) => {
    if (!queries[name]) {
        // Se a query não existir, retorna um erro.
        return false;
    } else {
        const [result] = await Connection.execute(queries[name], data);
        return result;
    }
};

module.exports = Connection;

require("./prepare");