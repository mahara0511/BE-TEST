const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'khanhzip14@gmail.com',
        pass: '0946635515',
    },
});

const sendOrderConfirmationEmail = async (
    recipientEmail,
    orderId,
    guestName
) => {
    const mailOptions = {
        from: 'khanhzip14@gmail.com',
        to: recipientEmail,
        subject: 'Order Confirmation',
        text: `Dear ${guestName},\n\nThank you for your order. Your order ID is ${orderId}. We will process it shortly.\n\nBest regards,\nGENZ company`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw new Error('Failed to send confirmation email');
    }
};

module.exports = { sendOrderConfirmationEmail };
