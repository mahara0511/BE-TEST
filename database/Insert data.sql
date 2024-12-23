INSERT INTO buyer (name, phone, gender, house_number, district, commune, province, housing_type)
VALUES
('John Doe', '123456789', 'Male', '123 Main St', 'District 1', 'Ward A', 'Hanoi', 'Apartment'),
('Jane Smith', '987654321', 'Female', '456 Elm St', 'District 2', 'Ward B', 'Ho Chi Minh City', 'House'),
('Alice Brown', '555444333', 'Female', '789 Pine St', 'District 3', 'Ward C', 'Da Nang', 'Villa'),
('Bob Johnson', '111222333', 'Male', '101 Maple St', 'District 4', 'Ward D', 'Hai Phong', 'Apartment'),
('Charlie White', '222333444', 'Other', '202 Oak St', 'District 5', 'Ward E', 'Can Tho', 'Townhouse'),
('David Green', '333444555', 'Male', '303 Birch St', 'District 6', 'Ward F', 'Hue', 'Apartment'),
('Ella Blue', '444555666', 'Female', '404 Cedar St', 'District 7', 'Ward G', 'Nha Trang', 'House'),
('Frank Black', '555666777', 'Male', '505 Spruce St', 'District 8', 'Ward H', 'Vung Tau', 'Villa'),
('Grace Silver', '666777888', 'Female', '606 Fir St', 'District 9', 'Ward I', 'Quang Ninh', 'Apartment'),
('Hannah Gold', '777888999', 'Other', '707 Ash St', 'District 10', 'Ward J', 'Hai Duong', 'Townhouse');

INSERT INTO "user" (id, email, password, image)
VALUES
(2, 'john@example.com', 'password123', 'john.png'),
(3, 'jane@example.com', 'password456', 'jane.png'),
(4, 'alice@example.com', 'password789', 'alice.png'),
(5, 'bob@example.com', 'password111', 'bob.png'),
(6, 'charlie@example.com', 'password222', 'charlie.png'),
(7, 'david@example.com', 'password333', 'david.png'),
(8, 'ella@example.com', 'password444', 'ella.png'),
(9, 'frank@example.com', 'password555', 'frank.png'),
(10, 'grace@example.com', 'password666', 'grace.png'),
(11, 'hannah@example.com', 'password777', 'hannah.png');

INSERT INTO brand (name, description, country, image)
VALUES
('Brand C', 'Premium quality', 'Germany', 'brand_c.png'),
('Brand D', 'Innovative design', 'Italy', 'brand_d.png'),
('Brand E', 'Sustainability focused', 'Australia', 'brand_e.png'),
('Brand F', 'Tech-forward', 'China', 'brand_f.png'),
('Brand G', 'Budget-friendly', 'India', 'brand_g.png'),
('Brand H', 'Luxury experience', 'France', 'brand_h.png'),
('Brand I', 'Adventure gear', 'Canada', 'brand_i.png'),
('Brand J', 'Urban lifestyle', 'UK', 'brand_j.png');

INSERT INTO category (name, image)
VALUES
('Clothing', 'clothing.png'),
('Books', 'books.png'),
('Kitchen', 'kitchen.png'),
('Health', 'health.png'),
('Toys', 'toys.png'),
('Sports', 'sports.png'),
('Beauty', 'beauty.png'),
('Gadgets', 'gadgets.png');

INSERT INTO product (name, discount, price, description, brand_id, category)
VALUES
('Stylish Shirt', 15.00, 300000, 'Comfortable and trendy', 2, 'Clothing'),
('Smartphone X', 20.00, 12000000, 'Latest technology', 3, 'Electronics'),
('Running Shoes', 10.00, 1500000, 'Lightweight and durable', 1, 'Sneakers'),
('Cookware Set', 25.00, 500000, 'Non-stick surface', 4, 'Kitchen'),
('Yoga Mat', 5.00, 200000, 'Eco-friendly material', 5, 'Health'),
('Action Figure', 30.00, 350000, 'Collector’s edition', 6, 'Toys'),
('Lipstick', 18.00, 150000, 'Long-lasting and vibrant', 7, 'Beauty'),
('Smartwatch', 10.00, 2500000, 'Track your fitness', 8, 'Gadgets'),
('Novel Book', 0.00, 200000, 'Best-selling fiction', 9, 'Books'),
('Mountain Bike', 12.00, 8000000, 'For adventure seekers', 10, 'Sports');

INSERT INTO detail (product_id, image, color, size)
VALUES
(2, 'shirt.png', 'Blue', 'M'),
(3, 'smartphone.png', 'Black', '128GB'),
(4, 'shoes.png', 'White', '42'),
(5, 'cookware.png', 'Silver', 'Medium'),
(6, 'yoga_mat.png', 'Green', 'Standard'),
(7, 'action_figure.png', 'Red', '15cm'),
(8, 'lipstick.png', 'Pink', '5g'),
(9, 'smartwatch.png', 'Black', 'Standard'),
(10, 'book.png', 'Multicolor', 'Paperback'),
(11, 'bike.png', 'Red', 'Large');

INSERT INTO "order" (order_date, total_price, buyer_id, status)
VALUES
('2024-01-15', 300000, 2, 'Delivered'),
('2024-02-10', 12000000, 3, 'Processing'),
('2024-03-12', 1500000, 4, 'Pending'),
('2024-04-18', 500000, 5, 'Cancelled'),
('2024-05-20', 200000, 6, 'Delivered'),
('2024-06-25', 350000, 7, 'Processing'),
('2024-07-30', 150000, 8, 'Pending'),
('2024-08-15', 2500000, 9, 'Processing'),
('2024-09-10', 200000, 10, 'Cancelled'),
('2024-10-20', 8000000, 1, 'Delivered');

INSERT INTO order_item (number, product_id, order_id, detail_id)
VALUES
(1, 2, 1, 1),
(2, 3, 2, 2),
(3, 4, 3, 3),
(4, 5, 4, 4),
(5, 6, 5, 5),
(6, 7, 6, 6),
(7, 8, 7, 7),
(8, 9, 8, 8),
(9, 10, 9, 9),
(10, 11, 10, 10);
