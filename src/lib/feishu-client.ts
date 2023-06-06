import * as config from 'config';
import * as lark from '@larksuiteoapi/node-sdk';

const client = new lark.Client({
    appId: config.get('feishu.app_id'),
    appSecret: config.get('feishu.app_secret'),
});

export default client;
