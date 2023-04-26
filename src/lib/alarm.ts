import axios from 'axios';
import * as config from 'config';

const WEBHOOK_URL = config.get('alarm.webhook_url') as string;

// 飞书报警
export async function feishu (
    data: {
        msg_type: string;
        card: string;
    }
) {
    return axios({
        url: WEBHOOK_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data,
    }).then(function (res) {
        if (res.status !== 200 || res.data.code !== 0) {
            console.log('[Post webhook Error]:');
            console.log('status:', res.status);
            console.log('data:', res.data);
            console.log('request options:', data);
        }
        return res;
    });
}
