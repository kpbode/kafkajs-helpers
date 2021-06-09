import { EachMessagePayload, Kafka, KafkaMessage } from "kafkajs";

import { scheduled } from "./scheduled";
import { milliseconds } from "./types";

/**
 * Wait for the first message receiving before hitting the specified timeout.
 * @param kafka The Kafka instance to use.
 * @param topic The topic to subscribe to.
 * @param consumerGroupId The consumer group id to use for consuming the topic.
 * @param maxWaitTime The maximum time to wait for a message on the topic.
 */
export async function waitForMessage(
   kafka: Kafka,
   topic: string,
   consumerGroupId: string,
   maxWaitTime: milliseconds,
): Promise<KafkaMessage | undefined> {
   // create the consumer and start the subscription
   const consumer = kafka.consumer({ groupId: consumerGroupId });
   await consumer.connect();
   await consumer.subscribe({ topic, fromBeginning: true });

   // execute the consumer and use the first received message to resolve a promise
   const receiveMessage = new Promise<KafkaMessage>((resolve) => {
      return consumer.run({
         eachMessage: async (payload: EachMessagePayload) => {
            resolve(payload.message);
         },
      });
   });

   // race against a promise with a simple timeout
   const message = await Promise.race<KafkaMessage | undefined>([
      receiveMessage,
      scheduled(maxWaitTime, () => undefined),
   ]);

   // disconnect and return the message or undefined
   await consumer.disconnect();
   return message;
}
