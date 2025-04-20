const pool = require('../config/database');

const Category = {
    create: async (name) => {
        const query = 'INSERT INTO category (name) VALUES ($1) RETURNING *';
        const values = [name];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    findAll: async () => {
        const query = 'SELECT * FROM category';
        const { rows } = await pool.query(query);
        return rows;
    },
    findById: async (id) => {
        const query = 'SELECT * FROM category WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },
    update: async (id, name) => {
        const query = 'UPDATE category SET name = $1 WHERE id = $2 RETURNING *';
        const values = [name, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    delete: async (id) => {
        const query = 'DELETE FROM category WHERE id = $1 RETURNING *';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },
};

module.exports = Category;