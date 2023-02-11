---
title: "Fundamentals of SQL Query Optimization"
tags:
  - bi
toc: true
toc_sticky: true
header:
  og_image: assets/images/post_images/4. SQL/sql_og.jpg
  #height: 1200
  #width: 630
  #Background color: #eeeeee
  #Text color: #222831
  #The recommended image ratio for an og:image is 1.91:1. The optimal size would be 1200 x 630.
excerpt: "In this post, we will explore some of these advanced techniques in greater detail, providing examples and best practices for optimizing SQL queries."
---

SQL query optimization is critical for advanced users who work with large, complex databases. Even small improvements in query performance can translate to significant gains in productivity and cost savings.
<br>
In some cases, poorly optimized queries can even bring a system to its knees.<br>
At its core, query optimization involves finding the most efficient way to retrieve data from a database. This often requires a deep understanding of the database structure, as well as the underlying hardware and software environment. Optimizing queries involves a variety of techniques.In this post, we will explore some of these advanced techniques in greater detail, providing examples and best practices for optimizing SQL queries. 

Below you can find some ways to significantly improve the performance and readability of your SQL Queries.<br>

# Avoid SELECT *
Please stop doing that. Reduce the number of columns returned in the ```SELECT``` statement to only those that are necessary for the query. <br>
This is a good practice for several reasons, especially in a columnar database.<br>
In a columnar database, each column is stored separately from the other columns, which means that retrieving data from a large number of columns can be slower than retrieving data from a smaller number of columns.<br>
By selecting ```*``` we increase the amount of data that needs to be transferred across the network and processed by the application. This can result in higher memory usage and longer processing times, which can negatively impact query performance. Furthermore, we reduce the clutter in the SELECT statement and make it easier to see what the query is doing. 

# Refer table names in columns
In a database with multiple tables, it is possible that two or more tables have columns with the same name. If we don't specify the table name when selecting columns, the database may not know which column we are referring to, leading to errors or incorrect results.<br> 
**No**
```sql
SELECT *
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id
INNER JOIN products p ON o.product_id = p.id
WHERE c.last_name = 'Smith' AND p.price > 100
ORDER BY o.order_date DESC;
```
**Yes**
```sql
SELECT o.order_number, 
       o.order_date, 
       c.first_name,
       c.last_name,
       p.product_name, 
       p.price
FROM orders o
INNER JOIN customers c
  ON o.customer_id = c.id
INNER JOIN products p
  ON o.product_id = p.id
WHERE c.last_name = 'Smith' 
      AND p.price > 100
ORDER BY o.order_date DESC;
```

It makes the query more readable and easier to understand. When we refer to columns without specifying the table name, it can be difficult to determine which table the column comes from, particularly if the query involves multiple tables.<br>
By including the table name in the SELECT statement we avoid conflicts when joining tables. It is possible for two or more tables to have columns with the same name.
{: .notice--info}

# Create temp tables
Temp tables can make the query more readable and easier to understand. Nested queries can become very complex and difficult to read, especially if there are several levels of nesting. It can also improve query performance. When we use a nested query, the database management system has to execute the inner query before it can execute the outer query. This can result in slower query performance, especially if the inner query involves a large amount of data or a complex calculation.<br>
They can be reused in multiple queries. When we use a nested query, we can only use the result set of the inner query once. If we need to use the same result set in multiple queries, we have to execute the inner query multiple times, which can result in slower query performance.<br> 
**No**
```sql
SELECT
    c.customer_name,
    qr.quarter,
    COALESCE(qr.quarter_revenue, 0) AS quarter_revenue,
    COALESCE(tr.total_revenue, 0) AS total_revenue
FROM
    customers c
    LEFT JOIN (
        SELECT
            customer_id,
            DATE_TRUNC('quarter', order_date) AS quarter,
            SUM(price * quantity) AS quarter_revenue
        FROM
            order_items oi
            JOIN orders o ON oi.order_id = o.order_id
        GROUP BY
            customer_id,
            quarter
    ) qr ON c.customer_id = qr.customer_id
    LEFT JOIN (
        SELECT
            customer_id,
            SUM(price * quantity) AS total_revenue
        FROM
            order_items oi
            JOIN orders o ON oi.order_id = o.order_id
        GROUP BY
            customer_id
    ) tr ON c.customer_id = tr.customer_id;
```
**Yes**
```sql
-- Create a temp table with all orders and their dates
CREATE TEMPORARY TABLE temp_orders AS
SELECT
    order_id,
    customer_id,
    order_date,
    SUM(price * quantity) AS revenue
FROM
    order_items
GROUP BY
    order_id;

-- Create a temp table with the revenue for each quarter of the year
CREATE TEMPORARY TABLE temp_quarter_revenue AS
SELECT
    customer_id,
    DATE_TRUNC('quarter', order_date) AS quarter,
    SUM(revenue) AS quarter_revenue
FROM
    temp_orders
GROUP BY
    customer_id,
    quarter;

-- Create a temp table with the total revenue for each customer
CREATE TEMPORARY TABLE temp_total_revenue AS
SELECT
    customer_id,
    SUM(revenue) AS total_revenue
FROM
    temp_orders
GROUP BY
    customer_id;

-- Combine the temp tables to get the revenue for each quarter and customer
SELECT
    c.customer_name,
    qr.quarter,
    COALESCE(qr.quarter_revenue, 0) AS quarter_revenue,
    COALESCE(tr.total_revenue, 0) AS total_revenue
FROM
    customers c
    LEFT JOIN temp_quarter_revenue qr ON c.customer_id = qr.customer_id
    LEFT JOIN temp_total_revenue tr ON c.customer_id = tr.customer_id;
```
This query achieves the same result as the previous example, it is more clear and easier to read and understand. It also faster, especially if there are many orders and/or customers, because it is not executing subqueries for each row in the main query. It breaks the query down into smaller, more manageable parts, and simplifies the logic, making it easier to read and optimize.
{: .notice--info}

# Use proper naming convention
Overall, it is important to use a consistent naming convention and to choose names that are descriptive, clear, and easy to understand. This makes it easier for users to work with the database and ensures that queries and joins are accurate and efficient.<br> 
**No**
```sql
CREATE TABLE emp (
    eid INT PRIMARY KEY,
    fname VARCHAR(50),
    lname VARCHAR(50),
    dob DATE,
    hdate DATE,
    did INT
);
```
**Yes**
```sql
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    date_of_birth DATE,
    hire_date DATE,
    department_id INT
);
```
Notice how the table and column names are all abbreviated and use a non-standard naming convention. The table name is in singular form, which could be confusing if there are multiple entities in the table.
<br>
The column names use abbreviations, which may not be immediately clear to users who are not familiar with the system. This can make it difficult to understand the relationships between tables and can lead to confusion and errors in querying the database.
{: .notice--info}

# Use uppercase keywords
Uppercase is more commonly used for SQL keywords, as it can make the code easier to read and differentiate between keywords and identifiers.<br>
Using uppercase for SQL keywords can help to improve code clarity, as it allows keywords to be easily distinguished from other elements in the query. Additionally, many SQL editors and tools are designed to highlight uppercase keywords, which can further improve readability and make it easier to spot errors.<br> 
**No**
```sql
select 
    count(*) as total_employees, 
    department 
from 
    employees 
where 
    department in ('Sales', 'Marketing') 
group by 
    department 
having 
    count(*) > 10 
order by 
    total_employees desc;
```
**Yes (Prefer)**
```sql
SELECT 
    COUNT(*) AS total_employees, 
    department 
FROM 
    Employees 
WHERE 
    department IN ('Sales', 'Marketing') 
GROUP BY 
    department 
HAVING 
    COUNT(*) > 10 
ORDER BY 
    total_employees DESC;
```
Consistency is key when it comes to choosing between uppercase and lowercase keywords. If you're working on a team or with a codebase that uses lowercase keywords, it's important to maintain that style for the sake of consistency and clarity.<br>
Ultimately, the choice between uppercase and lowercase SQL keywords comes down to personal preference and the style guidelines of your team or organization.
{: .notice--info}

# Use proper indentation and white spaces
Using proper indentation and spacing can help to make SQL code more readable and easier to maintain. It's important to follow best practices and to keep the code well-organized to prevent errors and improve efficiency.<br> 
**No**
```sql
SELECT c.customer_name,o.order_id,p.product_name,od.quantity
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
JOIN order_details od ON o.order_id = od.order_id
JOIN products p ON od.product_id = p.product_id
WHERE c.city = 'New York' AND o.order_date >= '2022-01-01' AND p.category_id = 2
ORDER BY c.customer_name ASC,o.order_id DESC;
```
**Yes**
```sql
SELECT 
    c.customer_name, 
    o.order_id, 
    p.product_name, 
    od.quantity 
FROM 
    customers c 
    JOIN orders o ON c.customer_id = o.customer_id 
    JOIN order_details od ON o.order_id = od.order_id 
    JOIN products p ON od.product_id = p.product_id 
WHERE 
    c.city = 'New York' 
    AND o.order_date >= '2022-01-01' 
    AND p.category_id = 2 
ORDER BY 
    c.customer_name ASC, 
    o.order_id DESC;
```
It's a bit faster to read and understand it, isn't it?
{: .notice--info}

# Summary
SQL optimization can have significant benefits for both performance and team collaboration.<br>
In terms of performance, optimizing SQL queries can significantly reduce the time and resources required to retrieve data from the database.<br>
In terms of team collaboration, SQL optimization can help ensure that the codebase is maintainable and scalable. Optimized SQL queries are generally more readable and easier to understand, which can make it easier for team members to collaborate and work together on projects. Additionally, SQL optimization can help prevent performance issues that may arise due to poorly written queries, which can help reduce the need for constant code maintenance and troubleshooting.<br>
Overall, SQL optimization is crucial for both performance and team collaboration. By optimizing SQL queries, teams can improve the performance of their applications, make their codebase more maintainable, and enhance collaboration and teamwork.
