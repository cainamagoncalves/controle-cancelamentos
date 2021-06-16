const Dao = require('./Dao')

module.exports = {
    getClientes: async (req, res) => {
      res.json(clientes);
    },
    getTeste: async (req, res) => {
        const dao = new Dao ()
        res.json(await dao.query('SELECT * FROM clientes'));
    },
}