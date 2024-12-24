CREATE TABLE seller (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255)
);

CREATE TABLE buyer (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    gender VARCHAR(10),
    house_number VARCHAR(50),
    district VARCHAR(50),
    commune VARCHAR(50),
    province VARCHAR(50),
    housing_type VARCHAR(50)
);

CREATE TABLE guest (
    id INT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    CONSTRAINT fk_guest_buyer FOREIGN KEY (id) REFERENCES buyer(id)
);

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    image TEXT,
    code INT DEFAULT 0,
    codeExpired TIMESTAMP DEFAULT CURRENT_TIMESTAMP + INTERVAL '5 MINUTES',
    CONSTRAINT fk_user_buyer FOREIGN KEY (id) REFERENCES buyer(id)
);

CREATE TABLE brand (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    country VARCHAR(50) NOT NULL,
    image VARCHAR(255)
);

CREATE TABLE category (
    name VARCHAR(255) PRIMARY KEY,
    image VARCHAR(255)
);

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    discount DECIMAL(3, 0),
    price DECIMAL(12, 0) NOT NULL,
    description TEXT,
    brand_id INT NOT NULL,
    category VARCHAR(255),
    CONSTRAINT fk_product_brand FOREIGN KEY (brand_id) REFERENCES brand(id),
    CONSTRAINT fk_product_category FOREIGN KEY (category) REFERENCES category(name)
);

CREATE TABLE detail (
    id SERIAL PRIMARY KEY,
    product_id INT,
    image VARCHAR(255),
    color VARCHAR(50),
    size VARCHAR(50),
    CONSTRAINT fk_detail_product FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE store (
    house_number VARCHAR(50),
    district VARCHAR(50),
    province VARCHAR(50),
    commune VARCHAR(50),
    description TEXT,
    product_id INT,
    CONSTRAINT fk_store_product FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE "order" (
    id SERIAL PRIMARY KEY,
    delivered_date DATE,
    order_date DATE NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    buyer_id INT,
    status VARCHAR(50),
    CONSTRAINT fk_order_buyer FOREIGN KEY (buyer_id) REFERENCES buyer(id),
    CONSTRAINT fk_order_detail FOREIGN KEY (detail_id) REFERENCES detail(id)
);

CREATE TABLE order_item (
    id SERIAL PRIMARY KEY,
    number INT NOT NULL,
    product_id INT,
    order_id INT,
    detail_id INT,
    CONSTRAINT fk_order_item_product FOREIGN KEY (product_id) REFERENCES product(id),
    CONSTRAINT fk_order_item_order FOREIGN KEY (order_id) REFERENCES "order"(id)
);

CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    number INT NOT NULL,
    last_modified TIMESTAMP,
    user_id INT,
    CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES "user"(id)
);

CREATE TABLE cart_item (
    id SERIAL PRIMARY KEY,
    number INT NOT NULL,
    product_id INT,
    cart_id INT,
    detail_id INT,
    CONSTRAINT fk_cart_item_product FOREIGN KEY (product_id) REFERENCES product(id),
    CONSTRAINT fk_cart_item_cart FOREIGN KEY (cart_id) REFERENCES cart(id),
    CONSTRAINT fk_cart_item_detail FOREIGN KEY (detail_id) REFERENCES detail(id)
);

CREATE TABLE voucher (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    discount DECIMAL(10, 2) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

CREATE TABLE order_voucher (
    order_id INT,
    voucher_id INT,
    PRIMARY KEY (order_id, voucher_id),
    CONSTRAINT fk_order_voucher_order FOREIGN KEY (order_id) REFERENCES "order"(id),
    CONSTRAINT fk_order_voucher_voucher FOREIGN KEY (voucher_id) REFERENCES voucher(id)
);

CREATE TABLE user_voucher (
    user_id INT,
    voucher_id INT,
    PRIMARY KEY (user_id, voucher_id),
    CONSTRAINT fk_user_voucher_user FOREIGN KEY (user_id) REFERENCES "user"(id),
    CONSTRAINT fk_user_voucher_voucher FOREIGN KEY (voucher_id) REFERENCES voucher(id)
);
