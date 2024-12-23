-- b
INSERT INTO buyer (name, phone, gender, house_number, district, commune, province, housing_type)
VALUES
('assessment', '328355333', 'Male', '73 tân hoà 2', 'Ba Bể', 'Phúc Lộc', 'Bắc Kạn', 'nhà riêng');

INSERT INTO "user" (id, email, password, image)
VALUES
(1, 'gu@gmail.com', '12345678', 'dichoikhong.png');

INSERT INTO brand (name, description, country, image)
VALUES
('Brand A', 'High-quality products', 'USA', 'brand_a.png'),
('Brand B', 'Affordable and durable', 'Japan', 'brand_b.png');

INSERT INTO category (name, image)
VALUES
('Electronics', 'electronics.png'),
('Furniture', 'furniture.png'),
('Sneakers', 'dichoikhong.png');

INSERT INTO product (name, discount, price, description, brand_id, category)
VALUES
('KAPPA Women ''s Sneakers', 10.00, 980000, 'Latest model with great features', 1, 'Sneakers');

INSERT INTO detail (image, color, size, product_id)
VALUES 
()

INSERT INTO "order" (order_date, total_price, buyer_id, status)
VALUES
(current_timestamp, 980000, 1, 'Processing');

INSERT INTO order_item (number, product_id, order_id, detail_id)
VALUES
(5, 1, 1, 1);

-- c

SELECT
    TO_CHAR(order_date, 'YYYY-MM') AS month,
    ROUND(AVG(total_price), 2) AS average_order_value
FROM
    "order"
WHERE
    EXTRACT(YEAR FROM order_date) = EXTRACT(YEAR FROM CURRENT_DATE)
GROUP BY
    TO_CHAR(order_date, 'YYYY-MM')
ORDER BY
    month;

-- d

WITH previous_period AS (
    SELECT DISTINCT buyer_id
    FROM "order"
    WHERE order_date BETWEEN CURRENT_DATE - INTERVAL '12 MONTHS'
                         AND CURRENT_DATE - INTERVAL '6 MONTHS'
),
recent_period AS (
    SELECT DISTINCT buyer_id
    FROM "order"
    WHERE order_date > CURRENT_DATE - INTERVAL '6 MONTHS'
),
churned_customers AS (
    SELECT buyer_id
    FROM previous_period
    WHERE buyer_id NOT IN (SELECT buyer_id FROM recent_period)
)
SELECT 
    (COUNT(churned_customers.buyer_id) * 100.0) / 
    (SELECT COUNT(*) FROM previous_period) AS churn_rate
FROM 
    churned_customers;
