# Demo

## Introducing Spicy Chat

"Today we're building Spicy Chat - our own AI-native enterprise messaging app."

"To show you what's happening, at the top we have a diagram of data flows, with the app on the bottom."

## Database Only: Typical app with PostgreSQL

- Click on General, show conversation, explain application data.

## Database and AI: Add OpenAI

- Show Pepper

"Of course Spicy Chat is AI native, so it has a built-in AI-assistant called Pepper. Let's say Hi"

- Ask Pepper to tell us joke

"This is a pretty typical app. Nothing special. A simple call to OpenAI, which is what most chatbots are like."

- Ask Pepper to summarise chat and show that OpenAI doesn't know anything about the channel.

"For OpenAI to give better answers, you have to do a lot of work to get your data to it"

## Multiple Data Sources: PostgreSQL + Databricks

"The first step in creating an enterprise AI-driven experience is data. For many organizations this often means querying data from many disparate sources, like agumenting application data with big data stored in data lakes or warehouses and fetching content from files."

"In this example, we need to query archival messaging data stored in our S3 datalake using Databricks, journal data stored in PostgreSQL, and combine that with the application's messaging data."

"That's two data sources, but most enterprises have many more. And that can often lead to data management nightmare."

## Spice Federated Data and AI

"Spice provides developers with a unified interface for federated data and AI."

"It's easy to configure this in Spice"

_Walk through spicepod_1.yaml_

"When I click the `archive` channel which includes this additional data, note that it's very slow to load, and this is because it's trying to query across all the messages in the data lake, which is a lot of data, and slow to query."

"Very slow, databricks can be expensive."

_Ask pepper to summarise #archive channel, don't wait_

- Fast data is no longer nice to have... for AI apps fast data is a necessity.

<!-- [Spicepod One](./spicepod_1.yaml) -->

## Spice Acceleration with DuckDB

- Spice can make slow data fast by accelerating data using **DuckDB**.

** Walk through spicepod_2.yaml and change to acceleration **

- Click on the `spiced-archive` channel, which has been materialized by Spice.

"You can see it's night and day"

- Pepper uses this data to give fast AI responses to users.

** Ask pepper to answer GCP question in #archive channel **

- This speed is needed for anything AI related
- Got some data from the daily journals, but doesn't have that much understanding.

<!-- [Spicepod Two](./spicepod_2.yaml) -->

## Spice Retrieval-Augmented-AI (RAG)

- Introduce writing at Spice, decision records, show list of documents at []().
- Pepper doesn't have them, in FTP server.
- _"like 30% of the enterprises we recently talked to, a lot of our data is stored in legacy systems like FTP, which the Spice runtime can connect to"_

- Enhance Pepper, by adding FTP

** Walk through Spicepod_3.yaml **

- Explain that Pepper
  - Has access to application, datalake, document stores
  - Is fast for Spicy Chat
  - For Pepper to search and answer questions

** Ask pepper to answer GCP question in #archive channel **

- Much faster
<!-- [Spicepod Three](./spicepod_3.yaml) -->

## Spice Data and AI Connectors
