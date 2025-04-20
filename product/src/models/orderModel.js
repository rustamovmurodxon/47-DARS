const pool = require('../config/database');

const Order = {
    create: async (user_id, product_id, total, status) => {
        const query = 'INSERT INTO orders (user_id, product_id, total, status) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [user_id, product_id, total, status];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    findAll: async () => {
        const query = 'SELECT * FROM orders';
        const { rows } = await pool.query(query);
        return rows;
    },
    findById: async (id) => {
        const query = 'SELECT * FROM orders WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },
    update: async (id, total, status) => {
        const query = 'UPDATE orders SET total = $1, status = $2 WHERE id = $3 RETURNING *';
        const values = [total, status, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    delete: async (id) => {
        const query = 'DELETE FROM orders WHERE id = $1 RETURNING *';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },
};

module.exports = Order;