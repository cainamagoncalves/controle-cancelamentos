
class Consultas {
    selectClientes(codigo) {
        return codigo ? `SELECT * FROM clientes WHERE id = ${codigo}` : 'SELECT * FROM clientes'
    }

    selectBairros(id) {
        return id ? `SELECT * FROM bairros WHERE id = ${id}` : 'SELECT * FROM bairros'
    }
    
    selectMotivos(id) {
        return id ? `SELECT * FROM motivos WHERE id = ${id}` : 'SELECT * FROM motivos'
    }

    selectTiposConexao(id) {
        return id ? `SELECT * FROM tipos_conexao WHERE id = ${id}` : 'SELECT * FROM tipos_conexao'
    }
}

module.exports = Consultas