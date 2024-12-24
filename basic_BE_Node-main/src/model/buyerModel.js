const db = require('../dbs/initDB.js');

class BuyerModel {
    static async addBuyer(
        name,
        phone,
        gender,
        house_number,
        district,
        commune,
        province,
        housing_type
    ) {
        try {
            const buyerResult = await db.query(
                `INSERT INTO buyer (name, phone, gender, house_number, district, commune, province, housing_type) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
                 RETURNING id`,
                [
                    name,
                    phone,
                    gender,
                    house_number,
                    district,
                    commune,
                    province,
                    housing_type,
                ]
            );

            // Trả về ID của buyer nếu thêm thành công
            return {
                success: true,
                buyerId: buyerResult.rows[0].id,
            };
        } catch (error) {
            console.error('Error adding buyer:', error.message);

            // Trả về thông báo lỗi nếu xảy ra lỗi
            return {
                success: false,
                message: 'Failed to add buyer',
                error: error.message,
            };
        }
    }

    static async addGuest(buyerId, email) {
        try {
            await db.query(`INSERT INTO guest (id, email) VALUES ($1, $2)`, [
                buyerId,
                email,
            ]);

            return {
                success: true,
            };
        } catch (error) {
            console.error('Error adding buyer:', error.message);

            // Trả về thông báo lỗi nếu xảy ra lỗi
            return {
                success: false,
                message: 'Failed to add buyer',
                error: error.message,
            };
        }
    }
}

module.exports = BuyerModel;
