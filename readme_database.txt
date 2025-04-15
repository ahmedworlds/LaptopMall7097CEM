SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `specifications` text DEFAULT NULL,
  `rating` decimal(3,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `products` (`id`, `name`, `brand`, `price`, `image`, `specifications`, `rating`) VALUES
(1, 'MacBook Air M1', 'Apple', 999.00, '/images/laptop1.jpg', '8GB RAM, 256GB SSD, Apple M1 Chip', 4.80),
(2, 'Dell XPS 13', 'Dell', 1299.00, '/images/laptop2.jpg', '16GB RAM, 512GB SSD, Intel Core i7', 4.70),
(3, 'HP Spectre x360', 'HP', 1199.00, '/images/laptop3.jpg', '16GB RAM, 1TB SSD, Intel Core i7', 4.60),
(4, 'Lenovo ThinkPad X1', 'Lenovo', 1499.00, '/images/laptop4.jpg', '16GB RAM, 512GB SSD, Intel Core i7', 4.50),
(5, 'Asus ROG Zephyrus G14', 'Asus', 1399.00, '/images/laptop5.jpg', '16GB RAM, 1TB SSD, AMD Ryzen 9', 4.70),
(6, 'Acer Swift 3', 'Acer', 799.00, '/images/laptop6.jpg', '8GB RAM, 512GB SSD, AMD Ryzen 7', 4.40),
(7, 'Microsoft Surface 4', 'Microsoft', 1299.00, '/images/laptop7.jpg', '16GB RAM, 512GB SSD, Intel Core i7', 4.60),
(8, 'Razer Blade 15', 'Razer', 1999.00, '/images/laptop8.jpg', '16GB RAM, 1TB SSD, Intel Core i7', 4.80),
(9, 'LG Gram 17', 'LG', 1699.00, '/images/laptop9.jpg', '16GB RAM, 1TB SSD, Intel Core i7', 4.50),
(10, 'Samsung Galaxy Book Pro', 'Samsung', 1099.00, '/images/laptop10.jpg', '16GB RAM, 512GB SSD, Intel Core i7', 4.60),
(11, 'MSI GS66 Stealth', 'MSI', 1799.00, '/images/laptop11.jpg', '32GB RAM, 1TB SSD, Intel Core i9', 4.70),
(12, 'Google Pixelbook Go', 'Google', 899.00, '/images/laptop12.jpg', '8GB RAM, 128GB SSD, Intel Core m3', 4.30);

CREATE TABLE `sales_orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `order_details` varchar(8000) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `sales_orders` (`id`, `user_id`, `total_amount`, `order_details`, `latitude`, `longitude`, `created_at`) VALUES
(37, 2, 1299.00, '[{\"id\":2,\"name\":\"Dell XPS 13\",\"brand\":\"Dell\",\"price\":\"1299.00\",\"image\":\"/images/laptop2.jpg\",\"specifications\":\"16GB RAM, 512GB SSD, Intel Core i7\",\"rating\":\"4.70\",\"quantity\":1}]', 52.40839876, -1.51038077, '2025-04-11 20:37:59'),
(38, 2, 1299.00, '[{\"id\":2,\"name\":\"Dell XPS 13\",\"brand\":\"Dell\",\"price\":\"1299.00\",\"image\":\"/images/laptop2.jpg\",\"specifications\":\"16GB RAM, 512GB SSD, Intel Core i7\",\"rating\":\"4.70\",\"quantity\":1}]', 52.40841220, -1.51040795, '2025-04-11 20:43:09'),
(39, 2, 1199.00, '[{\"id\":3,\"name\":\"HP Spectre x360\",\"brand\":\"HP\",\"price\":\"1199.00\",\"image\":\"/images/laptop3.jpg\",\"specifications\":\"16GB RAM, 1TB SSD, Intel Core i7\",\"rating\":\"4.60\",\"quantity\":1}]', 52.40849260, -1.51035409, '2025-04-11 21:22:19'),
(40, 2, 2298.00, '[{\"id\":2,\"name\":\"Dell XPS 13\",\"brand\":\"Dell\",\"price\":\"1299.00\",\"image\":\"/images/laptop2.jpg\",\"specifications\":\"16GB RAM, 512GB SSD, Intel Core i7\",\"rating\":\"4.70\",\"quantity\":1},{\"id\":1,\"name\":\"MacBook Air M1\",\"brand\":\"Apple\",\"price\":\"999.00\",\"image\":\"/images/laptop1.jpg\",\"specifications\":\"8GB RAM, 256GB SSD, Apple M1 Chip\",\"rating\":\"4.80\",\"quantity\":1}]', 52.40842528, -1.51039608, '2025-04-11 21:54:01'),
(45, 2, 1299.00, '[{\"id\":2,\"name\":\"Dell XPS 13\",\"brand\":\"Dell\",\"price\":\"1299.00\",\"image\":\"/images/laptop2.jpg\",\"specifications\":\"16GB RAM, 512GB SSD, Intel Core i7\",\"rating\":\"4.70\",\"quantity\":1}]', 52.40843971, -1.51035561, '2025-04-11 22:16:39');

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(200) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`) VALUES
(1, 'admin1', 'admin1@example.com', '$2b$10$mMGaoyNsKkvzAC5ZLgQdl.VPnQTtXu5MAAZok363WxJ9NLLRRvtLe', 'user'),
(2, 'user1', 'user1@example.com', '$2b$10$9p3eAzcBA0znMn00r7xCpunm44Qfz.eKogXow5NMYk2N40dD78SrW', 'user');


ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `sales_orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);


ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

ALTER TABLE `sales_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;


ALTER TABLE `sales_orders`
  ADD CONSTRAINT `sales_orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
