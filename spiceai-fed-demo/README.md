# spiceai-fed-demo
A demo showcasing the federated SQL and acceleration capabilities of spiceai.

## Demo

### Pre-reqs

0. Download and install the Spice.ai CLI

```bash
brew install spiceai/spiceai/spice
# or
curl https://install.spiceai.org | /bin/bash
```

1. Clone the repository

```bash
git clone https://github.com/spiceai/demos.git
cd demos/spiceai-fed-demo
```

Pull up the `SHOW.md` as a Preview for the intro.

### Running the demo

Spice is a unified SQL query interface and portable runtime to locally accelerate, and query data sourced from any database, data warehouse, or data lake.

Spice is built in Rust using industry-leading data technologies like Arrow and DataFusion - so it's fast and lightweight. You can run Spice next to your application to accelerate and federate SQL queries across any data source.

I'm building an application that needs to provide a unified view of sales data that I have spread across 3 different sources. I can create a Spicepod that configures the data sources, and my application can query the Spice runtime.

I've already got my Spicepod pre-configured with a few data sources I need to use. First I'll start the runtime:

```bash
spice run
```

Great, the Spice runtime is running and has loaded my datasets.

I'll start the Spice SQL REPL to provide a playground to test my queries:

```sql
-- I'll run a show tables to validate that my data sources are loaded. There are 5 datasets from 3 sources, and 2 are accelerated - which means Spice will keep a local copy of the data up-to-date for faster queries.
show tables
-- Now I'll do a federated query against the S3 source and compare it with the accelerated version
select * from s3_source
select * from s3_source_accelerated
-- I can also query the other sources
select * from pg_source
select * from dremio_source
select * from dremio_source_accelerated
```

```sql
-- Now I'll run a query that combines all the sales data from the different sources and performs some aggregations

WITH all_sales AS (
  SELECT sales FROM pg_source 
  UNION ALL 
  SELECT sales FROM s3_source_accelerated
  UNION ALL
  select fare_amount+tip_amount as sales from dremio_source_accelerated
)

SELECT SUM(sales) as total_sales, 
       COUNT(*) AS total_transactions,
       MAX(sales) AS max_sale,
       AVG(sales) AS avg_sale
FROM all_sales
```

Great, I'm happy with the results and I can modify my application to connect to and query Spice.

So that was a quick overview of using Spice to perform federated SQL queries across multiple data sources. It provides tools for accelerating those queries by keeping a local copy up-to-date automatically, and it abstracts away the implementation details so you can focus on building your application.

If this looks interesting, head over to our GitHub repo to download and try it out for yourself.
