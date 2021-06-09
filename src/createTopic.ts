import { Kafka } from "kafkajs";

export async function createTopic(kafka: Kafka, topic: string): Promise<void> {
   const admin = kafka.admin({});
   await admin.createTopics({
      waitForLeaders: true,
      topics: [{ topic }],
   });
}
