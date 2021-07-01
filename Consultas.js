
class Consultas {
    selectClientes(codigo) {
        return codigo ? `SELECT * FROM clientes WHERE codigo = ${codigo}` : 'SELECT * FROM clientes'
    }

    updateClientes(params) {
        return `UPDATE clientes SET 
        nome = '${params.nome}',
        ponto = ${params.ponto},
        status = ${params.status},
        nome_bairro = '${params.bairro}'
        WHERE codigo = ${params.codigo}`
    }

    selectBairros(bairro) {
        return bairro ? `SELECT * FROM bairros WHERE nome = '${bairro}'` : 'SELECT * FROM bairros'
    }

    updateBairros(params) {
        return `UPDATE bairros SET disponibilidade = ${params.disponibilidade} WHERE nome = '${params.nome}'`
    }

    selectMotivos(id) {
        return id ? `SELECT * FROM motivos WHERE id = ${id}` : 'SELECT * FROM motivos'
    }

    selectTiposConexao(id) {
        return id ? `SELECT * FROM tipos_conexao WHERE id = ${id}` : 'SELECT * FROM tipos_conexao'
    }
    
    selectRelatorioGeral() {
        return `SELECT TO_CHAR(r.data_relatorio,'DD/MM/YYYY HH:MI:SS') as data_relatorio, 
        TO_CHAR(r.data_cancelamento,'DD/MM/YYYY') as data_cancelamento, 
        c.codigo, c.nome as cliente, c.ponto, c.status,
        c.nome_bairro as bairro, b.disponibilidade, 
        m.descricao as motivo, t.descricao as tipo_conexao, r.obs FROM relatorio_geral r
        JOIN clientes c ON c.codigo = r.codigo_cliente
        JOIN bairros b ON b.nome = r.nome_bairro
        JOIN motivos m ON m.id = r.id_motivo
        JOIN tipos_conexao t ON t.id = r.id_tipo_conexao
        /*params*/
        ORDER BY data_relatorio`
    }

    insertClientes(params) {
        return `INSERT INTO clientes (codigo, nome, ponto, status, nome_bairro) VALUES (${params.codigo}, '${params.nome}', ${params.ponto}, ${params.status}, '${params.bairro}') RETURNING *`
    }

    insertBairros(params) {
        return `INSERT INTO bairros (nome, disponibilidade) VALUES ('${params.nome}', ${params.disponibilidade}) RETURNING *`
    }

    insertMotivos(params) {
        return `INSERT INTO motivos (descricao) VALUES ('${params.descricao}') RETURNING *`
    }

    insertTiposConexao(params) {
        return `INSERT INTO tipos_conexao (descricao) VALUES ('${params.descricao}') RETURNING * `
    }

    insertRelatorioGeral(params) {
        return `INSERT INTO relatorio_geral (
            codigo_cliente,
            ponto_cliente,
            nome_bairro,
            id_motivo,
            id_tipo_conexao,
            obs,
            data_relatorio,
            data_cancelamento
        ) 
        VALUES (
            ${params.codigo},
            ${params.ponto},
            '${params.bairro}',
            ${params.motivo},
            ${params.tipoConexao},
            '${params.obs}',
            LOCALTIMESTAMP(0),
            '${params.dataCancelado}'
        )`
    }
}


module.exports = Consultas
