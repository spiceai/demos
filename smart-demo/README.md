# Spice.ai SMART demo

The SMART demo shows getting started with Spice in 5 mins.

## Machine Setup

```bash
# Clone this repository
git clone git@github.com:spiceai/demos.git
cd smart-demo

# Install the Spice CLI
curl https://install.spiceai.org | /bin/bash
```

### Step 1. Show getting started with Spice OSS

```bash
# Initialize the Spice app and show the generated spicepod.yaml
spice init

# Set the name to "smart"

# Log in to the Spice.ai platform
spice login

# Start the Spice runtime
spice run
```

Note, the runtime starts HTTP, Arrow Flight, and OTEL endpoints.

Open another terminal window so the runtime can continue to run.

```bash
# Add the lukekim/smart spicepod
spice add lukekim/smart
```

## Model Deployment and Machine Learning Inference

Start telegraf to collect local disk data which will be used for ML inference.

```bash
telegraf --config telegraf.conf
```

Show the collected data using `spice sql`.

Run:

```bash
curl localhost:3000/v1/models/drive_stats/predict | jq
```

Explain what just happened in the prediction result and performance. `prediction` means the life percent the disk is at now.

## Model Refinement and Lifecycle

In the Spice.ai playground [spice.ai/lukekim/smart/playground](https://spice.ai/lukekim/smart/playground), show there is no data in last 30 minutes:

```sql
SELECT *
FROM lukekim.smart.drive_stats
WHERE time_unix_nano / 1e9 > (UNIX_TIMESTAMP() - 1800) -- show data in last half hour
ORDER BY time_unix_nano DESC
```

Explain how to use `mode: read_write` to replicate data to the Spice.ai platform.

Go back to the Spice.ai Playground show data is now being replicated to the cloud.

```sql
SELECT *
FROM lukekim.smart.drive_stats
WHERE time_unix_nano / 1e9 > (UNIX_TIMESTAMP() - 1800) -- show data in last half hour
ORDER BY time_unix_nano DESC
```

Go to Models, edit on GitHub, to change the training query to use the view `** FROM lukekim.smart.drive_stats_with_local` which will combine the cloud dataset with local replicated data.

Click **Train** to start a new training run with the combined data.

While the model is training, copy the training run ID of the previous model version and create a new model entry in the spicepod with the new version.

Edit `spicepod yaml`, duplicate the existing model entry to add a `non-latest` version.

```yaml
datasets:
    from: spice.ai/lukekim/smart/models/drive_stats:latest
    name: drive_stats_v2

    from: spice.ai/lukekim/smart/models/drive_stats:60cb80a2-d59b-45c4-9b68-0946303bdcaf` # Previous training run ID
    name: drive_stats_v1
```

Restart the runtime to show both models are now loaded.

Execute a new inference on both models.

```bash
curl --request POST \
  --url http://localhost:3000/v1/predict \
  --header 'Content-Type: application/json' \
  --data '{
    "predictions": [
        {
            "model_name": "drive_stats_v1"
        },
        {
            "model_name": "drive_stats_v2"
        }
    ]
}' | jq -r '.predictions.[] | [.model_name, .status, .duration_ms, .prediction[0]] | @csv' | column -s, -t
```

Explain why this is valuable (versioning, A/B testing, etc.) and the model lifecycle.
