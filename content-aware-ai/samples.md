## Spicepod Samples

### Local Embedding model
```yaml
embeddings:
  - name: from_hf
    from: huggingface:huggingface.co/sentence-transformers/all-MiniLM-L6-v2

  - name: from_local
    from: file://Users/jeadie/Github/spiceai/model.safetensors
    params:
      config_path: /Users/jeadie/Github/spiceai/config.json
      tokenizer_path: /Users/jeadie/Downloads/tokenizer.json

  - name: oai
    from: openai
```

### Local Chat models
```yaml
llms:
  - name: from_hf
    from: huggingface:huggingface.co/mistralai/Mistral-7B-Instruct-v0.1:73068f3702d050a2fd5aa2ca1e612e5036429398
    params:
      model_type: mistral

  - name: from_local
    from: file://Users/jeadie/.spice/llms/DuckDB-NSQL-7B-v0.1-q8_0.gguf
    params:
      tokenizer_config_path: /Users/jeadie/.cache/huggingface/hub/models--Qwen--Qwen1.5-0.5B/snapshots/8f445e3628f3500ee69f24e1303c9f10f5342a39/tokenizer.json

  - name: oai
    from: openai

```