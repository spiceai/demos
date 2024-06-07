# Demo

## Introducing Spicy Chat

- Today, we are building Spicy Chat - our own AI-native enterprise messaging app.
- Demo has two part: data flows on top, UX of Spicy Chat on bottom. 


## Mode 0: Just postgres
- Click on general, show conversation, explain application data.

## Mode 1: Add OpenAI
- Show Pepper: _"Of course Spice Chat is AI native, so it has a built-in AI-assistant called Pepper. Let's say Hi"_

_Ask Pepper to tell us joke_

- Simple call to OpenAI, thats what most Chatbots are like. 

__ Ask Pepper to summarise chat __

- Explain we're getting everything postgres, inserting into OpenAI. Fine for a toy app, Slow, lots of work for Spicy Chat

## Mode 2: Postgres + databricks
-  The first step in creating an enterprise AI-driven experience is data. For many organizations this often means querying data from many disparate sources, like agumenting application data with big data stored in data lakes or warehouses and fetching content from files.
In this example, we need to query archival messaging data stored in our S3 datalake using Databricks, journal data stored in PostgreSQL, and combine that with the application's messaging data.

- Two datasets, but most enterprises have many more.



## Mode 3: Spice unified query and intelligence

- UNified query interface, query across many sources at once. App has one interface
- Configure this in spice.

_Walk through spicepod_1.yaml_

- When I click the `archive` channel which includes this additional data, note that it's very slow to load, and this is because it's trying to query across all the messages in the data lake, which is a lot of data, and slow to query.
- Very slow, databricks is expensive.

### Mode 4: LLMs in Spice
- Explain Models in spice
    - Like datasets, reduce complexity
    - Reduce data transit
    - Speed

- If I want Pepper to use that information in her reply, it's unusable, too slow to be productive.

_Ask pepper to summarise #archive channel, don't wait_

- AI experience, has to be fast

<!-- [Spicepod One](./spicepod_1.yaml) -->

## Mode 5: Spice accelerated queries
- Spice can materialise the data Spicy Chat needs

__ Walk through spicepod_2.yaml and change to acceleration __

- Click on the `spiced-archive` channel, which has been materialized by Spice, you can see it's like night and day
- Pepper uses this data to give fast AI responses to users.

__ Ask pepper to answer GCP question in #archive channel __

- This speed is needed for anything AI related
- Got some data from the daily journals, but doesn't have that much understanding. 

<!-- [Spicepod Two](./spicepod_2.yaml) -->

## Mode 6 Content-aware Spice AI

- Introduce writing at Spice, decision records, show list of documents at [](). 
- Pepper doesn't have them, in FTP server.
- _"like 30% of the enterprises we recently talked to, a lot of our data is stored in legacy systems like FTP, which the Spice runtime can connect to"_

- Enhance Pepper, by adding FTP

__ Walk through Spicepod_3.yaml __

- Explain that Pepper
  - Has access to application, datalake, document stores
  - Is fast for Spicy Chat
  - For Pepper to search and answer questions

__ Ask pepper to answer GCP question in #archive channel __

- Much faster
<!-- [Spicepod Three](./spicepod_3.yaml) -->