---
title: "Run python scripts and use output tables with Tableau Table Extension"
tags:
  - tableau
  - python
  - tabpy
toc: true
toc_sticky: true
header:
  og_image: assets/images/post_images/blog_rounded_og.png
  #height: 1200
  #width: 630
  #The recommended image ratio for an og:image is 1.91:1. The optimal size would be 1200 x 630.
excerpt: "Run python scripts and use output tables with Tableau Table Extension"
---

## Why

Suppose we are working in a Tableau workbook and we need to process data obtained from an SQL query or a table. We realise that our desired goal either cannot be done using calculated fields or would be achieved more easily, in a more straightforward and readable way by using Python. Furthermore, **we may need some predictions into Tableau's data model by running a simple scikit-learn model.**
[Available in Tableau 2022.3](https://www.tableau.com/blog/release-data-guide-table-extensions-dynamic-zone-visibility), [Table Extensions](https://help.tableau.com/current/pro/desktop/en-us/td_table_extensions.htm) allow you to create new data tables with an analytics extensions script. We can write a custom TabPy (or Rserve) script and optionally add one or more input tables. **Using Table Extensions, you can unlock new data and transform, augment, score, or otherwise modify our data using Analytics Extensions like Python, R, and Einstein Discovery.** 

**Note:** Table extensions differs from writing code directly as Tableau calculated fields. It allows to use a desired table in the tableau data model as output after some Python/R processing.  
{: .notice--info}

## Setup & Configuration

### Python
We need to install Python from [here](https://www.python.org/).

### Tableau Desktop
We need [Tableau Desktop](https://www.tableau.com/support/releases)(>= 2022.3 version).

### Tabpy
[TabPy](https://tableau.github.io/TabPy/docs/server-install.html)(the Tableau Python Server) is an Analytics Extension implementation that expands Tableau's capabilities by allowing users to execute Python scripts and use the output either in a calculated field or as table extension.<br>
To install TabPy using `pip`, run: <br> 
`pip install tabpy`<br>
and to start the server run: <br>
`tabpy`<br>

The desired output is something like this: <br>

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/post_images/2.python_tableau/terminal.png){: .align-center}

By navigating to `localhost:9004` we can ensure that the server is running successfully.<br> 

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/post_images/2.python_tableau/tabpy_server.png){: .align-center}

We are now ready to taste our food.

## The Actual Thing
We'll use the Sample - Superstore dataset to build X clusters with 1, 2, 3 variables.  
1. Connection
By navigating to `Settings and Performance` and selecting `Manage Analytics Extension Connection` we connect with the python server.  
2. Data pane
We can now select any of the existing tables from our connections and notice the input table and output table selections in the bottom. Our output table is shown as Table extension. When the code runs, the output table will include any new columns from the returned python dictonary. Our new column `cluster` has been created. 
3. Code
We use the following sample script 
4. Clusters
We can now visualize our clusters. In the Distribution worksheet, we can say hello. The Discount Profit scatterplot displays the correlation between 2 out of the 3 independent variables highlighting the colour of each cluster.

## Summary
In a nutshell...We've managed to run python in Tableau Desktop locally and started a TabPy server. We can store data as dataframes from any database. Depending on our desired outcome, we may use tables from existing connections (or not), manipulate this data based on our needs and finally blend with the tables placed in our Tableau Data model. The python script should return a dictionary which will be used as the extended table.

## References
- [https://help.tableau.com/current/prep/en-us/prep_scripts_TabPy.htm](https://help.tableau.com/current/prep/en-us/prep_scripts_TabPy.htm)
- [https://towardsdatascience.com/tabpy-combining-python-and-tableau-511b10da8175](https://towardsdatascience.com/tabpy-combining-python-and-tableau-511b10da8175)
- [https://www.tableau.com/blog/release-data-guide-table-extensions-dynamic-zone-visibility](https://www.tableau.com/blog/release-data-guide-table-extensions-dynamic-zone-visibility)
- [https://help.tableau.com/current/pro/desktop/en-us/td_table_extensions.htm](https://help.tableau.com/current/pro/desktop/en-us/td_table_extensions.htm)