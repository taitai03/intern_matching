// lib/cable.js
import { createConsumer } from "@rails/actioncable";

let consumer;

export function getConsumer() {
  if (!consumer) {
    consumer = createConsumer("ws://localhost:3000/cable"); 
    // 本番なら wss://your-domain.com/cable
  }
  return consumer;
}
