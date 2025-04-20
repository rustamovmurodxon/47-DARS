const Order = require('../models/orderModel');
const { sendResponse } = require('../utils/response');

const orderController = {
    create: async (req, res) => {
        const { user_id, product_id, total, status } = req.body;
        try {
            const order = await Order.create(user_id, product_id, total, status);
            sendResponse(res, 201, 'Order created successfully', order);
        } catch (error) {
            sendResponse(res, 500, 'Server error', null, error.message);
        }
    },
    getAll: async (req, res) => {
        try {
            const orders = await Order.findAll();
            sendResponse(res, 200, 'Orders retrieved successfully', orders);
        } catch (error) {
            sendResponse(res, 500, 'Server error', null, error.message);
        }
    },
    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const order = await Order.findById(id);
            if (!order) return sendResponse(res, 404, 'Order not found');
            sendResponse(res, 200, 'Order retrieved successfully', order);
        } catch (error) {
            sendResponse(res, 500, 'Server error', null, error.message);
        }
    },
    update: async (req, res) => {
        const { id } = req.params;
        const { total, status } = req.body;
        try {
            const order = await Order.update(id, total, status);
            if (!order) return sendResponse(res, 404, 'Order not found');
            sendResponse(res, 200, 'Order updated successfully', order);
        } catch (error) {
            sendResponse(res, 500, 'Server error', null, error.message);
        }
    },
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const order = await Order.delete(id);
            if (!order) return sendResponse(res, 404, 'Order not found');
            sendResponse(res, 200, 'Order deleted successfully');
        } catch (error) {
            sendResponse(res, 500, 'Server error', null, error.message);
        }
    },
};

module.exports = orderController;