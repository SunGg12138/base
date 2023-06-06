import Redis from 'ioredis';
import * as config from 'config';

const redisConf = {
    host: process.env.REDIS_HOST || config.get('redis.host') as string,
    password: process.env.REDIS_PWD || config.get('redis.password') as string,
    port: Number(process.env.REDIS_PORT) || config.get('redis.port') as number,
};

export default new Redis(redisConf);

export const REDIS_KEY_PREFIX = {
    // 防止多次触发同个事件
    EVENT_UNIQUE: 'trusty-token:event-unique:',
    // 手机号对应的码
    PHONE_CODE: 'trusty-token:code:',
    // 事件信息存储
    EVENT_CARD_INFO: 'trusty-token:event-card-info:',
};
