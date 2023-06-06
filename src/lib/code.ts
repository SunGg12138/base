import * as crypto from 'crypto';
import redis, { REDIS_KEY_PREFIX } from './redis';

// 判断是否被占用
export async function isOccupy (phoneNumber: string, usefor: string) {
    const redisKey = `${REDIS_KEY_PREFIX.PHONE_CODE}${phoneNumber}:${usefor}`;
    const occupyRestTime = await redis.ttl(redisKey);
    return occupyRestTime;
}

// 生成验证码
export async function gen(phoneNumber: string, usefor: string, duration: number): Promise<string> {
    const redisKey = `${REDIS_KEY_PREFIX.PHONE_CODE}${phoneNumber}:${usefor}`;
    const code = crypto.randomInt(1000, 9999);
    await redis.set(redisKey, code, 'EX', duration);
    return code.toString();
}
