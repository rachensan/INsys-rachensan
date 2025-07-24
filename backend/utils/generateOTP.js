import redisClient from "./redisClient.js";
import crypto from "crypto";

export const generateOTP = async(email) => {
  const code = crypto.randomInt(100000, 999999).toString();
  const key = `otp:${email}`; //tie OTP to specific email, otp for a specific email only
        console.log(`key: ${key}`)
        console.log(`code: ${code}`)
  await redisClient.del(key); //delete the last key before generating another one
  await redisClient.setEx(key, 300, code); //(key, seconds, value)
  //prevents other users from stealing or reusing someone else’s OTP.
  return code;
}

export const verifyOTP = async(email, code) => {
  const key = `otp:${email}`;
  const storedCode = await redisClient.get(key);
        console.log(`key: ${key}`)
        console.log(`stoderedCode: ${storedCode}`)
        console.log(`code: ${code}`)
  if (storedCode !== code) return false;

  await redisClient.del(key); //delete the key after
  return true;
}