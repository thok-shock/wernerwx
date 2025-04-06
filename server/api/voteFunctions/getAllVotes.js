const db = require("../../db")

function getAllVotes() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM upvotes', (err, data) => {
            err ? reject(err) : resolve(data)
        })
    })
}

function getMyVotes(ip) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM upvotes WHERE ipAddress = ?', [ip], (err, data) => {
            err ? reject(err) : resolve(data)
        })
    })
}

function createUpvote(data) {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO upvotes (ipAddress, projectID, createdTime) VALUES (?, ?, ?)", [data.ipAddress, data.projectID, data.createdTime], (err, row) => {
            if (err) { reject(err) } else {
                db.query("SELECT * FROM upvotes WHERE voteID = ?",
                    [row.insertId],
                    (err, row) => {
                        err ? reject(err) : resolve(row[0]);
                    });
            }
        });
    });
}

module.exports = { getAllVotes, getMyVotes, createUpvote }