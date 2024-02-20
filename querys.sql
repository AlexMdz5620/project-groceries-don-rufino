-- Crear las tablas
--    tabla de productos
--    product:
    CREATE TABLE products(
        product_id serial,
        name_product varchar(150) NOT NULL,
        description text NOT NULL,
        price integer NOT NULL,
        sku varchar(8) UNIQUE NOT NULL,
		PRIMARY KEY(product_id)
    );

--    tabla de compradores
--    customer:
    CREATE TABLE customers(
        customer_id serial,
        first_name varchar(150) NOT NULL,
        last_name varchar(150) NOT NULL,
        email varchar(150) UNIQUE NOT NULL,
        phone varchar(10) NOT NULL,
        address text NOT NULL,
        postal_code varchar(5) NOT NULL,
        neighborhood_or_colony varchar(100) NOT NULL,
        city varchar(100) NOT NULL,
		PRIMARY KEY(customer_id)
    );

--    tabla de ventas
--    sales:
        CREATE TABLE sales(
        sale_id serial,
		product_id int NOT NULL,
        FOREIGN KEY(product_id) REFERENCES products(product_id),
		customer_id int NOT NULL,
        FOREIGN KEY(customer_id) REFERENCES customers(customer_id),
		num_sales int NOT NULL,
		PRIMARY KEY(sale_id)
    );

/* Productos a insertar:
        Lacteos: Leche, Yogur, Queso Listo
        Huevos Listo
        Azucar Listo
        Tortillas Listo
        Aceites para cocinar 2 o 3 marcas Listo
        Café soluble Listo
        Enlatados: Frijoes, Frutas en almivar, Vegetales en conserva, Atún Listo
        Frutas y verduras (opcional)
        Bebidas: Aguas, Jugos, Refrescos, Bebidas Deportivas, Listo
        Carnes y embutidos Listo
        Higiene Personal: Jabon, Shampoo, Rastillo, Papel Higienico, Pañales */

--  Sentencias Query para ingresar los Productos a la DB:
    INSERT INTO products(name_product, description, price, sku)
    VALUES ();

--  Cambios
    UPDATE products
    SET description = 'Lacteo 1 kg'
    WHERE product_id = 8;

--  Sentencias Query para ingresar los Clientes a la DB:
    INSERT INTO customers(
        first_name,
        last_name,
        email,
        password,
        phone,
        address,
        postal_code,
        neighborhood_or_colony,
        city
    )
    VALUES ();

--  Sentencias Query para ingresar las Ventas a la DB:
    INSERT INTO sales(product_id,customer_id,num_sales)
    VALUES ();

--Querys:
--1.- ID de los clientes de Monterrey.
    SELECT customer_id
    FROM customers
    WHERE city = 'Monterrey';

--2.- ID y descripción de los productos que cuesten menos de 15 pesos.
    SELECT product_id, description
    FROM products
    WHERE price < 15;

--3.- ID y nombre de los clientes, cantidad vendida, y descripcion del producto, en las ventas en las cuales se vendieron mas de 10 productos.
    SELECT c.customer_id, c.first_name, c.last_name, s.num_sales, p.description
    FROM customers AS c
    INNER JOIN sales AS s ON c.customer_id = s.customer_id
    INNER JOIN products AS p ON s.product_id = p.product_id
    WHERE s.num_sales > 10;

--4.- ID y nombre de los clientes que no aparecen en la tabla de ventas (Clientes que no han comprado productos).
    SELECT c.customer_id, c.first_name, c.last_name
    FROM customers AS c
    LEFT JOIN sales AS s ON c.customer_id = s.customer_id
    WHERE s.customer_id IS NULL;

--5.- ID y nombre de los clientes que han comprado todos los productos de la empresa.
    SELECT c.customer_id, c.first_name, c.last_name
    FROM customers AS c
    WHERE (
        SELECT COUNT(DISTINCT product_id) 
        FROM products
        ) = (
        SELECT COUNT(DISTINCT product_id) 
        FROM sales AS s
        WHERE s.customer_id = c.customer_id
    );

--6.- ID y nombre de cada cliente y la suma total (suma de cantidad) de los productos que ha comprado.
    SELECT c.customer_id, c.first_name, c.last_name, COALESCE(SUM(s.num_sales), 0) AS total_products_bought
    FROM customers c
    LEFT JOIN sales s ON c.customer_id = s.customer_id
    GROUP BY c.customer_id, c.first_name, c.last_name;

--7.- ID de los productos que no han sido comprados por los clientes de Guadalajara.
    SELECT product_id
    FROM products
    WHERE product_id NOT IN (
        SELECT product_id
        FROM sales
        WHERE customer_id IN (
            SELECT customer_id
            FROM customers
            WHERE city = 'Guadalajara'
        )
    );

--8.- ID de los productos que se han vendido a los clientes de Monterrey y y que tambien se han vendido a clientes de de Cancún.
    SELECT product_id
    FROM sales
    WHERE customer_id IN (
        SELECT customer_id
        FROM customers
        WHERE city = 'Monterrey'
    ) AND product_id IN (
        SELECT product_id
        FROM sales
        WHERE customer_id IN (
            SELECT customer_id
            FROM customers
            WHERE city = 'Cancún'
        )
    );

--9.- Nomber de las ciudades en las que se han vendido todos los productos.
    SELECT c.city
    FROM customers AS c
    INNER JOIN sales AS s
    ON c.customer_id = s.customer_id
    GROUP BY c.city
    HAVING COUNT(DISTINCT s.product_id) = (SELECT COUNT(DISTINCT product_id) FROM products);