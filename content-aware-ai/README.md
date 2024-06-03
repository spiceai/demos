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
cd content-aware-ai
npm install
```

Add `.env.local` to `./app` with the following content

```bash
SPICE_HTTP_ENDPOINT=http://localhost:3001
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

## Unified SQL Layer

## Accelerated datasets

## "Dumb" GenAI

## Content-Aware GenAI
