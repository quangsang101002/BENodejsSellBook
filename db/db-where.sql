SELECT * FROM rikkei_academy.users where role = 1;
-- lấy tất cả bản ghi "user" có role là 1
SELECT unit_price, DATE_FORMAT(products.created_at, '%Y-%m-%d') AS current_datet
FROM rikkei_academy.products
ORDER BY unit_price DESC
LIMIT 5;
-- lấy 5 sản phẩm cao nhất và lấy ngày

--3
SELECT products.category, COUNT(order_details.quantity) 
FROM rikkei_academy.products
LEFT JOIN order_details
ON products.product_id = order_details.order_detail_id
GROUP BY products.product_id,  products.category
--4
-- lấy các danh mục có ít nhất 2 sp
SELECT category, count(name) as quantity
FROM rikkei_academy.products
group by category
-- 
-- tìm chữ o và giá trên 20
SELECT name as products, unit_price
FROM rikkei_academy.products
where name like '%o%' and unit_price > 20

-- 6
SELECT name,created_by_id, updated_by_id
FROM rikkei_academy.products;
-- 7
SELECT category, sum(unit_price)
FROM rikkei_academy.products
group by category
-- 

-- 8
SELECT users.`id` AS user_id, users.`email`, users.`username`, users.`firt_name`, users.`last_name`, SUM(orders.total_price) 
AS SUM FROM orders LEFT JOIN users 
ON users.`id` = orders.`user_id` GROUP BY users.`id`, users.`username`;



