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
git clone https://github.com/phillipleblanc/spiceai-fed-demo.git
cd spiceai-fed-demo
```

2. Login to each data source

```bash
spice login # Logs into https://spice.ai
spice s3 login --access-key <access-key> --access-secret <secret-key>
spice postgres login --host <host> --port <port> --username <username> --password <password> --database <database>
```

Pull up the `SHOW.md` as a Preview for the intro.

### Running the demo

Spice.ai is a unified SQL query interface and portable runtime to locally accelerate, and query data sourced from any database, data warehouse, or data lake.

Spice.ai natively uses Arrow - so it's fast, and your applications can take advantage of a unified data model for query results across any data source.

I've already got a repo here pre-configured with a few data sources I want my apps to be able to use. First I'll start the runtime:

```bash
spice run
```

Now I have a running service that provides a unified SQL interface to my data sources. I also centralize storing the secrets needed to access my data sources, so my application becomes simpler. It also provides a natural connection pooler for backend DBs like Postgres.

4. Show queries in `spice sql`

```bash
spice sql
sql> show tables
sql> select * from s3_source
sql> select * from s3_source_accelerated
sql> select * from pg_source
sql> select * from spiceai_source
sql> select * from spiceai_source_accelerated
```

```sql

WITH all_sales AS (
  SELECT sales FROM pg_source 
  UNION ALL 
  SELECT sales FROM s3_source_accelerated
)

SELECT SUM(sales) FROM all_sales
```

5. Walk through the yaml definition for each dataset and explain how it works

So that was a quick overview of using spiceai to perform federated SQL queries across multiple data sources. It provides tools for accelerating those queries by keeping a local copy up-to-date automatically, and it abstracts away the implementation details of querying across each data source.

If this looks interesting, head over to our GitHub repo to download and try it out for yourself.
