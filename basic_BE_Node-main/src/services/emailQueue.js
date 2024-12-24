const dotenv = require('dotenv');
dotenv.config();
const sgMail = require('@sendgrid/mail');

// Cấu hình SendGrid
sgMail.setApiKey(process.env.API_KEY);

// Queue để lưu các email cần gửi
const emailQueue = [];

function addToQueue(emailData) {
    emailQueue.push(emailData);
}

// Xử lý queue gửi email
async function processQueue() {
    while (emailQueue.length > 0) {
        const emailData = emailQueue.shift(); // Lấy email đầu tiên trong queue

        const msg = {
            to: emailData.to,
            from: 'khanhzip14@gmail.com', // Địa chỉ email người gửi
            subject: emailData.subject,
            text: emailData.text,
            html: emailData.html,
        };

        try {
            await sgMail.send(msg); // Gửi email
            console.log(`Email sent to ${emailData.to}`);
        } catch (error) {
            console.error(`Error sending email to ${emailData.to}:`, error);
        }
    }
}

// Đặt một khoảng thời gian để kiểm tra và xử lý email trong queue
setInterval(processQueue, 5000); // Mỗi 5 giây, kiểm tra và xử lý email trong queue

module.exports = {
    addToQueue,
};
