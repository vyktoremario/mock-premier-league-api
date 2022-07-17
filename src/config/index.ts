import dotenv from 'dotenv';

dotenv.config();
const {
  PORT = 3000,
  HOST = 'localhost',
  RedisUrl,
  RedisPort,
  serverUrl,
  production,
  ENABLE_DEBUGGER,
} = process.env;

export const settings = {
  PORT,
  HOST,
  serverUrl,
  redisUrl: RedisUrl || '127.0.0.1',
  redisPort: RedisPort ? parseInt(RedisPort) : 6379,
  ENABLE_DEBUGGER: ENABLE_DEBUGGER === 'true',
  production: production === 'true',
};