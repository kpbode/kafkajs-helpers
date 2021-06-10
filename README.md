This a tiny helper to use with kafka (e.g. for integration tests).

# createTopic

Create a topic with a given kafkajs instance.

```
// ...

await createTopic(kafka, topic);

// ...
```

# waitForMessage

Starts a consumer and waits for the give time for message

```
// ...

const message = await waitForMessage(kafka, topic, "group-id", 10000);
expect(message).to.be.undefined;

```


