const { Client } = require('pg')
const config = {
    host: 'localhost',
    user: 'postgres',
    password: 'mudar123',
    database: 'postgres'
}

class Dao {
    query(sql) {
        const client = new Client(config)
        return new Promise((resolve, reject) => {
            client.connect(err => {

                if (err) reject(err)
                client.query(sql, (err, res) => {

                    if (err) reject(err)
                    else resolve(res.rows)
                    client.end()
                })
            })
        })
    }
}



module.exports = Dao