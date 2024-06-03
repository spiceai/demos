# Spice.ai Content-Aware AI (CAAI) Demo

Use Spice for high-performance content-aware generative-AI.

## "Dumb" GenAI

## Unified SQL Layer

## Accelerated datasets

## Content-Aware GenAI

---

## Start app and spice docker compose

```bash
make
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Start web app and spice separately

Start spice runtime

```bash
spiced --http 0.0.0.0:3001
```

Navigate to `./app` and install dependencies

```bash
npm i
```

Add `.env.local` to `./app` with the following content

```
SPICE_HTTP_ENDPOINT=http://localhost:3001
```

Run
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
