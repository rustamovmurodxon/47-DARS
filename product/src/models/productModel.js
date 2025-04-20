const pool = require('../config/database');

const Product = {
    create: async (name, price, description, stock_id, category_id) => {
        const query = 'INSERT INTO products (name, price, description, stock_id, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [name, price, description, stock_id, category_id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    findAll: async () => {
        const query = 'SELECT * FROM products';
        const { rows } = await pool.query(query);
        return rows;
    },
    findById: async (id) => {
        const query = 'SELECT * FROM products WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },
    update: async (id, name, price, description, stock_id, category_id) => {
        const query = 'UPDATE products SET name = $1, price = $2, description = $3, stock_id = $4, category_id = $5 WHERE id = $6 RETURNING *';
        const values = [name, price, description, stock_id, category_id, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    delete: async (id) => {
        const query = 'DELETE FROM products WHERE id = $1 RETURNING *';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },
};

module.exports = Product;