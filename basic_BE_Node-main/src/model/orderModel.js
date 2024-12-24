const db = require('../dbs/initDB.js');

class OrderModel {
    static async createOrder(totalPrice, buyerId) {
        try {
            const orderResult = await db.query(
                `INSERT INTO "order" (order_date, total_price, buyer_id, status) 
                 VALUES (current_timestamp, $1, $2, $3) RETURNING id`,
                [totalPrice, buyerId, 'Pending']
            );

            return {
                success: true,
                orderId: orderResult.rows[0].id,
            };
        } catch (error) {
            return {
                success: false,
                message: 'Failed to create order',
                error: error.message,
            };
        }
    }

    static async createOrderItem(item, orderId) {
        try {
            await db.query(
                `INSERT INTO order_item (number, product_id, order_id, detail_id) 
                 VALUES ($1, $2, $3, $4)`,
                [item.number, item.productId, orderId, item.detailId]
            );
            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
                message: 'Failed to create orderItem',
                error: error.message,
            };
        }
    }

    static async editOrderStatus(id, success) {
        try {
            let status = 'Cancelled'; // Mặc định là 'Cancelled'

            if (success) {
                status = 'Success';
            }

            // Sử dụng câu lệnh SQL với tham số thay vì ghép giá trị trực tiếp
            const result = await db.query(
                `UPDATE "order" SET status = $1 WHERE id = $2`,
                [status, id]
            );

            if (result.rowCount === 0) {
                // Trường hợp không tìm thấy đơn hàng với ID đã cho
                return {
                    success: false,
                    message: 'Order not found',
                };
            }

            return {
                success: true,
                message: 'Order status updated successfully',
            };
        } catch (error) {
            console.error('Error updating order status:', error.message);
            return {
                success: false,
                message: 'Failed to edit status',
                error: error.message,
            };
        }
    }
}

module.exports = OrderModel;
