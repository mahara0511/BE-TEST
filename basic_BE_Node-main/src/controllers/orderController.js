const BuyerModel = require('../model/buyerModel');
const OrderModel = require('../model/orderModel');
class OrderController {
    static async createOrder(req, res) {
        try {
            const { guest, order, orderItems } = req.body;

            // Thêm thông tin buyer
            buyerResult = BuyerModel.add({ guest });

            const buyerId = buyerResult.rows[0].id;

            // Thêm thông tin guest
            await db.query(`INSERT INTO guest (id, email) VALUES ($1, $2)`, [
                buyerId,
                guest.id,
            ]);

            // Thêm thông tin order
            const orderResult = await db.query(
                `INSERT INTO "order" (order_date, total_price, buyer_id, status) 
                 VALUES (current_timestamp, $1, $2, $3) RETURNING id`,
                [order.totalPrice, buyerId, 'Pending']
            );
            const orderId = orderResult.rows[0].id;

            // Xử lý từng sản phẩm trong danh sách orderItems
            for (const item of orderItems) {
                await db.query(
                    `INSERT INTO order_item (number, product_id, order_id, detail_id) 
                     VALUES ($1, $2, $3, $4)`,
                    [item.number, item.productId, orderId, item.detailId]
                );
            }

            res.status(201).json({
                message: 'Order created successfully',
                orderId,
            });
        } catch (error) {
            console.error('Error creating order:', error.message);

            res.status(500).json({
                message: 'Failed to create order',
                error: error.message,
            });
        }
    }

    static async confirm(req, res) {}
}

module.exports = OrderController;
