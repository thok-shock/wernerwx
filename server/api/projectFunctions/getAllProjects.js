const db = require("../../db");

function getAllProjects() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM projects', (err, data) => {
            err ? reject(err) : resolve(data)
        })
    })
    
}

module.exports = getAllProjects