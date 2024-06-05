# Spice.ai Content-Aware AI (CAAI) Demo

Use Spice for high-performance content-aware generative-AI.

## Machine Setup

```bash
# Build and install Spice with Models
git clone https://github.com/spiceai/spiceai.git
cd spiceai
make install-with-models

# Clone this repository and install packages
git clone git@github.com:spiceai/demos.git
cd demos/content-aware-ai
npm install
```

Add `.env.local` to `./app` with the following content

```bash
SPICE_HTTP_ENDPOINT=http://localhost:3001
OPENAI_API_KEY=<your-openai-api-key>
```

## Start Spice

Set supabase db username for `daily_journal` dataset.

Start spice runtime

```bash
SPICE_SECRET_POSTGRES_PASSWORD="<supabase_db_password>" spiced --http 0.0.0.0:3001
```

## Start App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Demo

Recently, we got access to [Glue AI](https://glue.ai), a new AI-native enterprise messaging application. With Glue you can invite AI to your team
conversations to help facilitate discussions, like leveraging AI to provide background research. Glue can access conversation threads, files, and other data but will only reply with data the user is allowed to access. It's pretty cool and a great example of the types of AI native experiences competitive applications will include in the future.

But like other types of software, there's a ton of challenges to create this type of experience that have nothing to do with the core business value the application provides. The application needs to access data from within the application to acrosss the enterprise. From text in a database, to files, to images, and more. And for a smooth experience, it has to find the right data and access it super fast.

In this demo, we're going to show you how Spice provides building-blocks to connect applications with data and AI, so you can build your own AI-native production-grade application, focusing on the business value you bring, without worrying about all the plumbing.

### Introducing Spicy Chat

Today, we are building Spicy Chat - our own AI-native enterprise messaging app.

If we click on the `general` channel you can see that application data like conversations load quickly.

And like Glue AI, Spicy Chat, has a native, built-in AI-assistant called Pepper. Let's say Hi.

If I ask Pepper a question, she already has private, local access to Spicy Chat data, and that's because while we're using the standard OpenAI SDK, we're targeting the Spice runtime, which has been configured with knowledge of local datasets that OpenAI does not.

"@Pepper, summarize today's conversations"

### Create Data-Driven App

The first step in creating an enterprise AI-driven experience is data-readiness. For many organizations this often means querying data from many disparate sources, like agumenting application data with big data stored in data lakes or warehouses and fetching content from files.

In this example, we need to query archival messaging data stored in our S3 datalake using Databricks, journal data stored in PostgreSQL, and combine that with the application's messaging data.

With Spice, this is easy. We can simply define datasets in the `spicepod.yaml` manifest.

```yaml
version: v1beta1
kind: Spicepod
name: content-aware-ai

datasets:
  - from: s3://spiceai-demo-datasets/taxi_trips/2024/
    name: federated_dataset
    description: taxi trips in s3 (federated)
    results_cache:
      enabled: false
    params:
      file_format: parquet
```

These datasets are now available for query through a single view through the Spice runtime using a single endpoint.

### Using this data in the App

When I click the `archive` channel which includes this additional data, note that it's very slow to load, and this is because it's trying to query across all the messages in the data lake, which is a lot of data, and slow to query.

Worse, if I want Pepper to use that information in her reply, it's almost to slow to be productive.

"@Pepper, when did we decide to use the vitest testing framework instead of jest, and what conversations happened to make that decision?"

## Accelerated Datasets

With Spice, you can materialize and accelerate datasets. By adding the `acceleration` section, we can replicate a copy of the data we expect to need and colocate it with the application for very fast retrieval.

```yaml
- from: s3://spiceai-demo-datasets/taxi_trips/2024/
  name: accelerated_dataset
  description: taxi trips in s3 (accelerated)
  params:
    file_format: parquet
  acceleration:
    enabled: true
```

If I click on the `spiced-archive` channel, which has been materialized by Spice, you can see it's like night and day; significantly faster.

Let's re-ask the question.

"@Pepper, when did we decide to use the vitest testing framework instead of jest, and what conversations happened to make that decision?"

Wow, see how much faster that was. That's why fast access to data across your enterprise is critical for building intelligent applications.

## Content-Aware GenAI

Note, though, Pepper actually missed an important piece. At Spice, writing is fundamental, and we record all our decisions using Spice Decision Records. Pepper didn't have access to these because they are stored in files on our FTP server. Yep, you heard me right, like 30% of the enterprises we recently talked to, a lot of our data is stored in legacy systems like FTP, which the Spice runtime can connect to.

To enhance Pepper's capabilities, let's add a new FTP dataset, and in addition, have Spice automatically generate embeddings, which is a fancy way of saying, let's index these documents for fast search.

```yaml
- from: s3://spiceai-demo-datasets/cleaned_sales_data.parquet
  name: sales_data_cleaned_embedded
  description: cleaned sales data with embeddings
  acceleration:
    enabled: true
  embeddings:
    - column: address_line1
      use: openai_embeddings

embeddings:
  - name: openai_embeddings
    from: openai
```

Spicy Chat can now quickly search for the content it needs, fetch the relevant file content, and enable Pepper to provide accurate, context-aware generative AI responses.

Let's ask that question again.

"@Pepper, when did we decide to use the vitest testing framework instead of jest, and what conversations happened to make that decision?"

Wow, now it's provided a great answer, with a reference to the relevant Spice Decision Record, and blazingly fast.

That's hot!

## Summary

In this demo, we showcased how you can create a high-performance content-aware AI application using Spice. By fetching and accelerating datasets, utilizing embeddings, and connecting data to AI, Spice.ai enables you to leverage enterprise-wide data for intelligent applications.

Everything demonstrated was real, live, and done 100% locally, using the Spice open-source, platform-agnostic runtime. You're not locked into any cloud or backend data and everything is local and private. You also have your choice of AI provider or you can use a local model.

Spice connects apps with data and AI.
