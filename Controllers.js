const Dao = require('./Dao')
const Consultas = require('./Consultas')

const consultas = new Consultas()
const dao = new Dao()

module.exports = {

  getTeste: async (req, res) => {
    const sql = consultas.verifyBairros(req.query.bairro)
    res.json(await dao.query(sql))
  },

  getIndex: async (req, res) => {
    const data = {}
    data.motivos = await dao.query(consultas.selectMotivos())
    data.tiposConexao = await dao.query(consultas.selectTiposConexao())
    res.render('index', { data })
  },


  getRelatorio: async (req, res) => {
    const data = await dao.query(consultas.selectRelatorioGeral())
    res.render('relatorio', { data })
  },

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
    
    const { codigo, nome, ponto, status, idBairro } = req.body

    if (!isNaN(codigo, ponto)) {
      const sql = consultas.insertClientes({codigo, nome, ponto, status, idBairro})

      await dao.query(sql).catch(e => res.send(e.routine))

      return res.status(200).send('Cliente cadastrado com sucesso!')

    }
    return res.status(400).send("Insira valor numérico para código e/ou ponto")
  },


  postBairros: async (req, res) => {
    const { nome, disponibilidade = false } = req.body
    const sql = consultas.insertBairros(nome, disponibilidade)
    res.json(await dao.query(sql))
  },

  postMotivos: async (req, res) => {
    const { descricao } = req.body
    const sql = consultas.insertMotivos(descricao)
    res.json(await dao.query(sql))
  },

  postTiposConexao: async (req, res) => {
    const { descricao } = req.body
    const sql = consultas.insertTiposConexao(descricao)
    res.json(await dao.query(sql))
  },

  postRelatorioGeral: async (req, res) => {
    const cliente = {
      codigo: req.body.codigoCliente,
      nome: req.body.nomeCliente,
      ponto: req.body.pontoCliente,
      status: req.body.status,
      bairro: req.body.nomeBairro
    }
    const bairro = { 
      nome: req.body.nomeBairro,
      disponibilidade: req.body.disponibilidade
    }
    const relatorioGeral = {
      codigo: req.body.codigoCliente,
      ponto: req.body.pontoCliente,
      bairro: req.body.nomeBairro,
      motivo: req.body.motivo,
      tipoConexao: req.body.tipoConexao,
      obs: req.body.obs,
      dataCancelado: req.body.dataCancelado
    }

    const bairroExiste = await dao.query(consultas.selectBairros(bairro.nome))//.catch(e => res.send(e.routine))

    if (bairroExiste.length === 1) {
      await dao.query(consultas.updateBairros(bairro))//.catch(e => res.send(e.routine))
    } else {
      await dao.query(consultas.insertBairros(bairro))//.catch(e => res.send(e.routine))
    }

    const clienteExiste = await dao.query(consultas.selectClientes(cliente.codigo))

    if (clienteExiste.length === 1) {
      await dao.query(consultas.updateClientes(cliente))
    } else {
      await dao.query(consultas.insertClientes(cliente))//.catch(e => res.send(e.routine))
    }
    
    await dao.query(consultas.insertRelatorioGeral(relatorioGeral))//.catch(e => res.send(e.routine))

    res.status(200).send("Sucesso!")
  }  
}
