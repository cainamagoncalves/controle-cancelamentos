const Dao = require('./Dao')
const Consultas = require('./Consultas')
const { param } = require('./Routes')

const consultas = new Consultas()
const dao = new Dao()

module.exports = {
  getClientes: async (req, res) => {
    const sql = consultas.selectClientes()
    res.json(await dao.query(sql));
  },

  getBairros: async (req, res) => {
    const sql = consultas.selectBairros()
    res.json(await dao.query(sql))
  },

  getMotivos: async (req, res) => {
    const sql = consultas.selectMotivos()
    res.json(await dao.query(sql))
  },

  getTiposConexao: async (req, res) => {
    const sql = consultas.selectTiposConexao()
    res.json(await dao.query(sql))
  },

  postClientes: async (req, res) => {
    if (!isNaN(req.query.codigo)) {
      if (!isNaN(req.query.ponto)) {
        const params = {
          codigo: req.query.codigo,
          nome: req.query.nome,
          ponto: req.query.status,
          status: req.query.ponto
        }
        const sql = consultas.insertClientes(params)
        res.json(await dao.query(sql))
      } else {
        res.status(400).send('Insira um valor numérico para o ponto!')
      }
    } else {
      res.status(400).send('Insira um valor numérico para o código!')
    }
  },

  postBairros: async (req, res) => {
    const params = {
      nome: req.query.nome,
      disponibilidade: req.query.disponibilidade
    }
    const sql = consultas.insertBairros(params)
    res.json(await dao.query(sql))
  },

  postMotivos: async (req, res) => {
    const params = {
      descricao: req.query.descricao
    }
    const sql = consultas.insertMotivos(params)
    res.json(await dao.query(sql))
  },

  postTiposConexao: async (req, res) => {
    const params = {
      descricao: req.query.descricao
    }
    const sql = consultas.insertTiposConexao(params)
    res.json(await dao.query(sql))
  }
}


// getTeste: async (req, res) => {
//     const dao = new Dao ()
//     res.json(await dao.query('SELECT * FROM clientes'));