// import { createClient } from 'redis';

// const redisClient = createClient();

// redisClient.on("error", (err) => {
//   console.error("Redis Client Error: ", err);
// });

// await redisClient.connect();

// export default redisClient;
import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL,
  socket: {
    tls: true,               // Required if using rediss:// or Render TLS
    rejectUnauthorized: false
  },
});

redisClient.on("error", (err) => console.error("Redis Client Error:", err));

await redisClient.connect();

export default redisClient;


