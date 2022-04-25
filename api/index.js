const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'defaultdb',
};
const mysql = require('mysql2')

app.get('/', (req, res) => {
    const connection = mysql.createConnection(config)
    const insertSql = `INSERT INTO users (name) values ('Fabio')`
    connection.query(insertSql)
    
    let rs = '<h1>Full Cycle Rocks!</h1> \
                <br/> \
                <h3>Users</h3> \
                <br/> \
                <ul>'

    const selctSql = `SELECT * FROM users`
    connection.query(selctSql, (_, data) => {
        
        data?.forEach(u => rs += `<li>${u.id} - ${u.name}</li>`)
        
        rs += '</ul>'
        
         res.send(rs)
        
        connection.end()
    })

})

app.listen(port, ()=> {
    console.log(':: API :: -> Rodando na porta ' + port)
})