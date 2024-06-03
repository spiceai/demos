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

Start spice runtime

```bash
spiced --http 0.0.0.0:3001
```

## Start App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Demo

### Create Data-Driven App

The first step in creating an AI-driven experience is data-readiness. This often means querying data and fetching content from various sources, then combining it into a unified or virtual view.

In this example, we need to query data from S3 using Databricks.

With Spice, this is easy. We can simply define the dataset in the `spicepod.yaml` file that we want to connect to.

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

### Using this data in the App

Navigate to the App and use the interface to ask @AI a question about the thread.

Note that it's very slow to load, and this is because it's trying to load all the contextual data by querying the S3 source directly.

## Accelerated Datasets

With Spice, you can materialize and accelerate datasets. By adding the `acceleration` section, we can replicate a copy of the data we expect to need and colocate it with the application.

```yaml
- from: s3://spiceai-demo-datasets/taxi_trips/2024/
  name: accelerated_dataset
  description: taxi trips in s3 (accelerated)
  params:
    file_format: parquet
  acceleration:
    enabled: true
```

Click the "Fast" conversation thread, and show that it loads much faster.

Re-ask the question and show how much faster it is.

## Content-Aware GenAI

Note that the answer it provides is pretty generic. It doesn't have access to all the data it needs, which is stored in files.

To enhance the AI capabilities, we can add a new dataset with embeddings:

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

Spice will automatically fetch the file content and generate embeddings.

The app can use these embeddings to quickly search for the content it needs and provide accurate, context-aware responses.

## Summary

In this demo, we showcased how Spice.ai can create a high-performance content-aware AI-driven application. By fetching and accelerating datasets, and utilizing embeddings, Spice.ai enables efficient and intelligent AI capabilities.

Everything demonstrated was done 100% locally, using an open-source, platform-agnostic runtime. You're not locked into any cloud or backend data provider, and everything is local and private. You also have your choice of AI provider or you can use a local model.

Spice connects apps with data and AI, making your applications smarter and faster.
