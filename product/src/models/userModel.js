const pool = require('../config/database');

const User = {
    create: async (name, email, password) => {
        const query = 'INSERT INTO "user" (name, email, password) VALUES ($1, $2, $3) RETURNING *';
        const values = [name, email, password];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    findByEmail: async (email) => {
        const query = 'SELECT * FROM "user" WHERE email = $1';
        const { rows } = await pool.query(query, [email]);
        return rows[0];
    },
};

module.exports = User;