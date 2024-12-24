const { sendOrderConfirmationEmail } = require('../services/emailQueue'); // Import the email service
const BuyerModel = require('../model/buyerModel');
const OrderModel = require('../model/orderModel');

class OrderController {
    // [Post] api/v1/order/create
    static async createOrder(req, res) {
        try {
            const { guest, order, orderItems } = req.body;

            // Thêm thông tin buyer
            let buyer = await BuyerModel.addBuyer(
                guest.name,
                guest.phone,
                guest.gender,
                guest.house_number,
                guest.district,
                guest.commune,
                guest.province,
                guest.housing_type
            );
            if (!buyer.success) {
                return res.status(500).json({
                    message: 'Failed to create buyer',
                    error: buyer.error,
                });
            }

            const buyerId = buyer.buyerId;

            // Thêm thông tin guest
            let guestResult = await BuyerModel.addGuest(buyerId, guest.email);
            if (!guestResult.success) {
                return res.status(500).json({
                    message: 'Failed to create guest',
                });
            }

            // Thêm thông tin order
            const orderResult = await OrderModel.createOrder(
                order.totalPrice,
                buyerId
            );
            if (!orderResult.success) {
                return res.status(500).json({
                    message: 'Failed to create order',
                });
            }
            const orderId = orderResult.orderId;

            // Xử lý từng sản phẩm trong danh sách orderItems
            for (const item of orderItems) {
                let ok = await OrderModel.createOrderItem(item, orderId);
                if (!ok.success) {
                    return res.status(500).json({
                        message: ok.error,
                    });
                }
            }

            // Gửi email xác nhận đơn hàng
            emailQueue.addToQueue({
                to: guest.email,
                subject: `Order Confirmation - ${orderId}`,
                text: `Thank you for your order! Your order ID is ${orderId} and the total amount is ${totalAmount}.`,
                html: `<strong>Thank you for your order!</strong><br>Your order ID is ${orderId} and the total amount is ${totalAmount}.`,
            });

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

    // [PUT] api/v1/order/editStatus
    static async editStatus(req, res) {
        try {
            const { id, success } = req.body;

            // Gọi phương thức editOrderStatus để cập nhật trạng thái
            const result = await OrderModel.editOrderStatus(id, success);

            if (result.success) {
                // Trả về phản hồi nếu trạng thái cập nhật thành công
                res.status(200).json({
                    message: 'Order edited successfully',
                    orderId: id, // Trả về id của đơn hàng đã được sửa
                });
            } else {
                // Trường hợp không tìm thấy đơn hàng hoặc có lỗi
                res.status(400).json({
                    message: result.message || 'Failed to edit order',
                });
            }
        } catch (error) {
            console.error('Error edit order:', error.message);

            res.status(500).json({
                message: 'Failed to edit order',
                error: error.message,
            });
        }
    }
}

module.exports = OrderController;
