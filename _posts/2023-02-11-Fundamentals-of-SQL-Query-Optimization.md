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

# Use lowercase code
The truth is that for many years, I used to code in uppercase SQL. This finally changed, when I had to adapt myself in a professional setting that codes lowercase. I got used to it immediately and I never looked back.<br>

Despite the fact that uppercase is more commonly used for SQL keywords, as it can make the code easier to read and differentiate between keywords and identifiers, **unfortunately, it is not ergonomic. Lowercase style is less "noisy" and more natural.** You do not have to focus on pressing CAPS LOCK but in the SQL side of things. Finally, readability is getting the same when you are getting used to lowercase.<br>

**Instead of this**
```sql
SELECT
    department 
    , COUNT(*) AS total_employees 
FROM Employees 
WHERE department IN ('Sales', 'Marketing')
GROUP BY department
HAVING COUNT(*) > 10 
ORDER BY total_employees DESC
```
**Do this**
```sql
select 
    department
    , count(*) as total_employees  
from employees 
where department in ('Sales', 'Marketing') 
group by department 
having count(*) > 10 
order by total_employees desc
```
**Consistency** is key when it comes to choosing between uppercase and lowercase keywords. If you're working on a team or with a codebase that uses lowercase keywords, it's important to maintain that style for the sake of consistency and clarity.<br>
Ultimately, the choice between uppercase and lowercase SQL keywords comes down to personal preference and the style guidelines of your team or organization.
{: .notice--info}

# Use leading commas
In SQL, `leading commas` and `trailing commas` refer to the placement of commas in a list of items within a SQL statement. Let's break down these terms:
- Leading commas refer to commas that appear at the beginning of each element in a list
- Trailing commas refer to commas that appear at the end of each element in a list

Of course, there is no single standard for how to write SQL code. Some people use uppercase keywords, while some lowercase. Some use trailing commas and others leading commas.<br>

Trailing commas style is easier to read for most people. One advantage of using leading commas is that the last item doesn't differ from the others, but on the other hand the first item differs.<br>

To my experience, **leading commas style is easier for debugging as for errors that will occur due to missing commas, it will be faster to check the lines from start instead of their end and fix the appropriate line.**<br>

The most crucial thing here is to **adapt ourselves** in the organisation that you belong and stick to the team's coding style. It's more useful to have pieces of code with a consistent look, rather applying your personal preferences.
{: .notice--info}

**Instead of this**
```sql
select 
    order_id, 
    order_date, 
    user_id, 
    customer_name, 
    line_item_id 
from line_items
```
**Do this**
```sql
select 
    order_id
    , order_date
    , user_id
    , customer_name
    , line_item_id
from line_items
```
**aha moment:** Imagine that a comma is missing. Which style suits you bette for debugging?
{: .notice--info}

# Refer table names in columns
In a database with multiple tables, it is possible that two or more tables have columns with the same name. If we don't specify the table name when selecting columns, the database may not know which column we are referring to, leading to errors or incorrect results.<br> 

**Instead of this**
```sql
select
    order_number
    , order_date 
    , first_name
    , last_name
    , product_name
    , price
from orders o
inner join customers c on o.customer_id = c.id
inner join products p on o.product_id = p.id
where c.last_name = 'Smith' and p.price > 100
order by order_date desc;
```
**Do this**
```sql
select o.order_number 
       , o.order_date
       , c.first_name
       , c.last_name
       , p.product_name
       , p.price
from orders o
inner join customers c on o.customer_id = c.id
inner join products p on o.product_id = p.id
where c.last_name = 'Smith' and p.price > 100
order by o.order_date desc;
```
It makes the query **more readable and easier to understand**. When we refer to columns without specifying the table name, it can be **difficult to determine which table the column comes from**, particularly if the query involves multiple tables.<br>
by including the table name in the select statement we **avoid conflicts** when joining tables. It is possible for two or more tables to have columns with the same name.
{: .notice--info}

# Use Common Table Expressions (CTEs) and/or temp tables
**CTEs** and **temp tables** can make the query **more readable and easier to understand**. Nested queries can become very complex and difficult to read, especially if there are several levels of nesting. It can also improve query performance. When we use a nested query, the database management system has to execute the inner query before it can execute the outer query. This can result in slower query performance, especially if the inner query involves a large amount of data or a complex calculation.<br>
They can be **reused** in multiple queries. When we use a nested query, we can only use the result set of the inner query once. If we need to use the same result set in multiple queries, we have to execute the inner query multiple times, which can result in slower query performance.<br>

- Breaking down complex queries into smaller, results in more **manageable and readable parts**. This can greatly improve the clarity and maintainability of SQL code.

- **Code Reusability**
Results can be referenced multiple times within a single query.

- **Easier Debugging and Testing**
It becomes simpler to isolate and debug specific parts of a query.

- **Code Documentation**
Properly named CTEs and temp tables can serve as self-documenting code, providing descriptive names for temporary result sets and making the intention of the query clearer. 

**The choice between CTEs and temporary tables depends on the specific requirements of your query and the nature of the data manipulation you're performing**. In many cases, CTEs are favored for their simplicity and scope, while temporary tables are chosen for scenarios requiring persistence and reuse of intermediate results.<br>

**Instead of this**
```sql
select
    c.customer_name
    , qr.quarter
    , coalesce(qr.quarter_revenue, 0) as quarter_revenue
    , coalesce(tr.total_revenue, 0) as total_revenue
from
    customers c
    left join (
        select
            customer_id
            , date_trunc('quarter', order_date) as quarter
            , sum(price * quantity) as quarter_revenue
        from
            order_items oi
            join orders o on oi.order_id = o.order_id
        group by
            customer_id,
            quarter
    ) qr on c.customer_id = qr.customer_id
    left join (
        select
            customer_id
            , sum(price * quantity) as total_revenue
        from
            order_items oi
            join orders o on oi.order_id = o.order_id
        group by
            customer_id
    ) tr on c.customer_id = tr.customer_id;
```

**Do this**
```sql
-- Create a temp table with all orders and their dates
create temporary table temp_orders as
select
    order_id
    , customer_id
    , order_date
    , sum(price * quantity) as revenue
from order_items
group by order_id;

-- Create a temp table with the revenue for each quarter of the year
create temporary table temp_quarter_revenue as
select
    customer_id
    , date_trunc('quarter', order_date) as quarter
    , sum(revenue) as quarter_revenue
from temp_orders
group by customer_id, quarter;

-- Create a temp table with the total revenue for each customer
create temporary table temp_total_revenue as
select
    customer_id
    , sum(revenue) as total_revenue
from temp_orders
group by customer_id;

-- Combine the temp tables to get the revenue for each quarter and customer
select
    c.customer_name
    , qr.quarter
    , coalesce(qr.quarter_revenue, 0) as quarter_revenue
    , coalesce(tr.total_revenue, 0) as total_revenue
from customers c
    left join temp_quarter_revenue qr on c.customer_id = qr.customer_id
    left join temp_total_revenue tr on c.customer_id = tr.customer_id;
```

**Instead of this**
```sql
select *
from
(
  select
    aggregated_data.customer_city
    , aggregated_data.seller_city
    , avg_price_total
    , dense_rank() over (partition by customer_city order by sales desc) as rank_of_seller
  from
  (
    select
      customers.customer_city
      , sellers.seller_city
      , avg(price) as avg_price_total
      , count(*) as sales
    from order_items
    left join (select seller_id, seller_city from sellers) sellers
    on order_items.seller_id = sellers.seller_id
    left join (select order_id, customer_id from orders where order_status = 'delivered') orders
    on order_items.order_id = orders.order_id
    left join (select customer_id, customer_city from customers) customers
    on orders.customer_id = customers.customer_id
    where price > 30
    group by1,2
  ) aggregated_data
) rank_data
cross join (select avg(price) as avg_price_total from order_items where price > 30) avg_price_for_order_items
where customer_city = 'cabo frio' and rank_of_seller = 3
"""
```
**Do this**
```sql
with sellers_cte as (
  select
    seller_id
    , seller_city
  from sellers
)

, order_items_cte as (
  select
    order_id
    , order_item_id
    , seller_id
    , price
  from order_items
  where price > 30
)

, avg_price_for_order_items_cte as (
  select
    avg(price) as avg_price_total
  from order_items_cte
)

, orders_cte as (
  select
    order_id
    , customer_id
  from orders
  where order_status = 'delivered'
)

, customers_cte as (
  select
    customer_id
    , customer_city
  from customers
)

, aggregated_data as (
  select
    customers_cte.customer_city
    , sellers_cte.seller_city
    , count(*) as sales
    , avg(order_items_cte.price) as avg_price_per_city_combo
  from order_items_cte
  left join sellers_cte
  on order_items_cte.seller_id = sellers_cte.seller_id
  left join orders_cte
  on order_items_cte.order_id = orders_cte.order_id
  left join customers_cte
  on orders_cte.customer_id = customers_cte.customer_id
  group by 1,2
)

, rank_cte as (
  select
    aggregated_data.customer_city
    , aggregated_data.seller_city
    , avg_price_per_city_combo
    , dense_rank() over (partition by customer_city order by sales desc) as rank_of_seller
  from aggregated_data
)

select *
from rank_cte
cross join avg_price_for_order_items_cte
where customer_city = 'cabo frio' and rank_of_seller = 3
```

**Note:** These queries achieve the same result but they are more clear and easier to read and understand. They are also faster, especially if there are many orders and/or customers, because it is not executing subqueries for each row in the main query. It breaks the query down into smaller, more manageable parts, and simplifies the logic, making it easier to read and optimize.
{: .notice--info}

# Use proper naming convention
Overall, it is important to use a consistent naming convention and to choose names that are descriptive, clear, and easy to understand. This makes it easier for users to work with the database and ensures that queries and joins are accurate and efficient.<br> 

**Instead of this**
```sql
create table emp (
    emp_id int primary key
    , fn varchar(50)
    , ln varchar(50)
    , date_birth date
    , hd date
    , dpt_id int
);
```
**Do this**
```sql
create table employees (
    employee_id int primary key
    , first_name varchar(50)
    , last_name varchar(50)
    , date_of_birth date
    , hire_date date
    , department_id int
);
```
Notice how the table and column names are all abbreviated and use a non-standard naming convention. The table name is in singular form, which could be confusing if there are multiple entities in the table.
<br>
The column names use abbreviations, which may not be immediately clear to users who are not familiar with the system. This can make it difficult to understand the relationships between tables and can lead to confusion and errors in querying the database.
{: .notice--info}

# Avoid select *
Please stop doing that. Reduce the number of columns returned in the ```select``` statement to only those that are necessary for the query. <br>
This is a good practice for several reasons, especially in a columnar database.<br>
In a columnar database, each column is stored separately from the other columns, which means that retrieving data from a large number of columns can be slower than retrieving data from a smaller number of columns.<br>
by selecting ```*``` we increase the amount of data that needs to be transferred across the network and processed by the application. This can result in higher memory usage and longer processing times, which can negatively impact query performance. Furthermore, we reduce the clutter in the select statement and make it easier to see what the query is doing. 

**Instead of this**
```sql
select * 
from orders
```
**Do this**
```
select 
    order_id
    , user_id
    , order_date
from orders
```

# Use proper indentation and white spaces
Using proper indentation and spacing can help to make SQL code more readable and easier to maintain. It's important to follow best practices and to keep the code well-organized to prevent errors and improve efficiency.<br> 

**Instead of this**
```sql
select c.customer_name,o.order_id,p.product_name,od.quantity
from customers c
join orders o on c.customer_id = o.customer_id
join order_details od on o.order_id = od.order_id
join products p on od.product_id = p.product_id
where c.city = 'New York' and o.order_date >= '2022-01-01' and p.category_id = 2
order by c.customer_name asC,o.order_id desc;
```
**Do this**
```sql
select 
    c.customer_name
    , o.order_id
    , p.product_name
    , od.quantity 
from customers c 
    join orders o on c.customer_id = o.customer_id 
    join order_details od on o.order_id = od.order_id 
    join products p on od.product_id = p.product_id 
where 
    c.city = 'New York' 
    and o.order_date >= '2022-01-01' 
    and p.category_id = 2 
ORDER by c.customer_name asc, o.order_id desc;
```
It's a bit faster to read and understand it, isn't it?
{: .notice--info}

# Summary
SQL optimization can have significant benefits for both performance and team collaboration.<br>
In terms of performance, optimizing SQL queries can significantly reduce the time and resources required to retrieve data from the database.<br>
In terms of team collaboration, SQL optimization can help ensure that the codebase is maintainable and scalable. Optimized SQL queries are generally more readable and easier to understand, which can make it easier for team members to collaborate and work together on projects. Additionally, SQL optimization can help prevent performance issues that may arise due to poorly written queries, which can help reduce the need for constant code maintenance and troubleshooting.<br>
Overall, SQL optimization is crucial for both performance and team collaboration. by optimizing SQL queries, teams can improve the performance of their applications, make their codebase more maintainable, and enhance collaboration and teamwork.

{: .notice--info}
Did you like the post? Empower me to dedicate more time and resources to curate, create, and share content that educates and inspires.

<a href="https://www.buymeacoffee.com/antonisangelakis" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>