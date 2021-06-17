
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

    insertClientes(params) {
        return `INSERT INTO clientes (codigo, nome, ponto, status) VALUES (${params.codigo}, '${params.nome}', ${params.status}, ${params.ponto}) RETURNING *`
    }

    insertBairros(params) {
        return `INSERT INTO bairros (nome, disponibilidade) VALUES ('${params.nome}', '${params.disponibilidade}') RETURNING *`
    }

    insertMotivos(params) {
        return `INSERT INTO motivos (descricao) VALUES ('${params.descricao}') RETURNING *`
    }

    insertTiposConexao(params) {
        return `INSERT INTO tipos_conexao (descricao) VALUES ('${params.descricao}') RETURNING * `
    }
}


module.exports = Consultas