# Demo

## Introducing Spicy Chat

"Today we're building Spicy Chat - our own AI-native enterprise messaging app."

"The demo is split into two parts, at the top we have a diagram of data flows, at the bottom the app."

## Database Only: Typical app with PostgreSQL

- Click on general, show conversation

"As you can see on the top, Spicy Chat is calling to PostgreSQL to fetch application data"

- Explain application data, graph.

- Click on General, show conversation, explain application data.

## Database and AI: Add OpenAI

- Show Pepper

"Of course Spicy Chat is AI native, so it has a built-in AI-assistant called Pepper. Let's say Hi"

- Ask Pepper to tell us joke

"But This is a pretty typical app. Nothing special. A simple call to OpenAI, which is what most chatbots are like."

- Ask Pepper to summarise chat and show that OpenAI doesn't know anything about the channel.

"If I ask Pepper here to summarize the channel, it doesn't know anything about it"

"For OpenAI to give better answers, you have to do a lot of work to get your data to it"

## Multiple Data Sources: PostgreSQL + Databricks

"So how might we do this?"

"The first step is data."

"This often means querying data from many disparate sources, like agumenting application data with big data stored in data lakes or warehouses and fetching content from files."

"In this example, we need to query archival data stored in our S3 datalake using Databricks, journal data stored in PostgreSQL, and combine that with our application's data."

"That's only two data sources, but most enterprises have many more. And that can often lead to data management nightmare."

## Spice Federated Data and AI

"Spice provides developers with a single, unified interface for federated data and AI."

"It's easy to configure this in Spice"

_Walk through spicepod_1.yaml_

"When I click the `archive` channel, note that it's slow to load."

"This is because it's trying to query across all the messages in our data lake, which is a lot of data"

"That's very slow, and of course, databricks can be quite expensive."

_Ask pepper to summarise #archive channel, don't wait_

"Fast data is no longer just a nice to have... for AI apps fast data is a necessity. User's simply won't wait."

<!-- [Spicepod One](./spicepod_1.yaml) -->

## Spice Acceleration with DuckDB

"Spice can make slow data fast by accelerating with **DuckDB**."

** Walk through spicepod_2.yaml and change to acceleration **

"And we can enable this acceleration simply by adding 3 lines to our config.

- Click on the `spiced-archive` channel, which has been materialized by Spice.

"You can see it's loaded almost instantly. It's night and day"

"Pepper can use this data to give much more intelligent responses to users fast."

** Ask pepper to answer GCP question in #archive channel **

"Great. As you can see Pepper was able to use data from the app and daily journal channel to give us a relevant answer."

"But this doesn't have everything"

<!-- [Spicepod Two](./spicepod_2.yaml) -->

## Spice Retrieval-Augmented-AI (RAG)

- Introduce writing at Spice, decision records, show list of documents at []().

"At Spice, witing is a big part of our culture, and we record all our decisions in what we call Spice Decision Records. Here's an example of some of them."

"Pepper doesn't have access to them, because they are stored on an FTP server."

"That's right, like 30% of the enterprises we talked to, much of our data is stored in legacy systems like FTP, but the good news is, Spice can connect to those too"

- Enhance Pepper, by adding FTP

** Walk through Spicepod_3.yaml **

- Explain that Pepper

  - Has access to application, datalake, document stores
  - Is fast for Spicy Chat
  - For Pepper to search and answer questions

"Pepper now has access to data in PostgreSQL, in our data lake, and content from our FTP server. And all that data is materialized and accelerated in DuckDB for super fast retrieval."

"Let's ask Pepper that question again"

- Ask pepper to answer GCP question in #archive channel

"Pepper, why did we remove GCP?"

"Boom! Now we have a relevant answer, with full references to supporting documents, and it was super fast."

<!-- [Spicepod Three](./spicepod_3.yaml) -->

## Spice Data and AI Connectors

"Spice doesn't just connect to PostgreSQL and Databricks."

"Spice has a ton of connectors to make building AI apps easy across any data source or AI backend."
