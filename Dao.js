const { Client } = require('pg')
const config = {
    host: 'tuffi.db.elephantsql.com',
    user: 'kzlwiesn',
    password: 'vTlyjfxeU1NOjgV59GnhlxhfhjszaYIq',
    database: 'kzlwiesn'
}

const client = new Client(config)

class Dao {
    query(sql) {
        return new Promise((resolve, reject) => {
            const con = client

            con.connect(err => {
                if(err) resolve(err)
            })

            con.query(sql, (err, res) => {
                if(err) resolve(err)
                else resolve(res.rows)

                con.end()
            })
        })
    }
}

module.exports = Dao