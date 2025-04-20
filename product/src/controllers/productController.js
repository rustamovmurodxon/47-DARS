const Product = require('../models/productModel');
const { sendResponse } = require('../utils/response');

const productController = {
    create: async (req, res) => {
        const { name, price, description, stock_id, category_id } = req.body;
        try {
            const product = await Product.create(name, price, description, stock_id, category_id);
            sendResponse(res, 201, 'Product created successfully', product);
        } catch (error) {
            sendResponse(res, 500, 'Server error', null, error.message);
        }
    },
    getAll: async (req, res) => {
        try {
            const products = await Product.findAll();
            sendResponse(res, 200, 'Products retrieved successfully', products);
        } catch (error) {
            sendResponse(res, 500, 'Server error', null, error.message);
        }
    },
    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const product = await Product.findById(id);
            if (!product) return sendResponse(res, 404, 'Product not found');
            sendResponse(res, 200, 'Product retrieved successfully', product);
        } catch (error) {
            sendResponse(res, 500, 'Server error', null, error.message);
        }
    },
    update: async (req, res) => {
        const { id } = req.params;
        const { name, price, description, stock_id, category_id } = req.body;
        try {
            const product = await Product.update(id, name, price, description, stock_id, category_id);
            if (!product) return sendResponse(res, 404, 'Product not found');
            sendResponse(res, 200, 'Product updated successfully', product);
        } catch (error) {
            sendResponse(res, 500, 'Server error', null, error.message);
        }
    },
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const product = await Product.delete(id);
            if (!product) return sendResponse(res, 404, 'Product not found');
            sendResponse(res, 200, 'Product deleted successfully');
        } catch (error) {
            sendResponse(res, 500, 'Server error', null, error.message);
        }
    },
};

module.exports = productController;