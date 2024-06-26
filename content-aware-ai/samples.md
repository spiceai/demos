## Spicepod Samples

### Local Embedding model
```yaml
embeddings:
  - name: from_hf
    from: huggingface:huggingface.co/sentence-transformers/all-MiniLM-L6-v2

  - name: from_local
    from: file://Users/you/Github/spiceai/model.safetensors
    params:
      config_path: ./config.json
      tokenizer_path: /Users/me/Downloads/tokenizer.json

  - name: oai
    from: openai
```

### Local Chat models
```yaml
llms:
  - name: from_hf
    from: huggingface:huggingface.co/mistralai/Mistral-7B-Instruct-v0.1
    params:
      model_type: mistral

  - name: from_local
    from: file://Users/jeadie/.spice/llms/DuckDB-NSQL-7B-v0.1-q8_0.gguf
    params:
      tokenizer_config_path: /Users/hub/models--Qwen--Qwen1.5-0.5B/snapshots/tokenizer.json

  - name: oai
    from: openai

```
