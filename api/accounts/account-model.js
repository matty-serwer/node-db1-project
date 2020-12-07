const db = require("./../../data/dbConfig");

module.exports = {
    getAll() {
        return db("accounts");
    },
    getById(id) {
        return db("accounts").where({ id }).first();
    }
}