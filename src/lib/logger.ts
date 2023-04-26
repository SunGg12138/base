import * as alarm from './alarm';
import * as path from 'path';
import * as log4js from 'log4js';

log4js.configure({
    appenders: {
        server: {
            type: 'file',
            filename: path.join(__dirname, '../../logs/server'),
            maxLogSize: 100 * 1024 * 1024,
            backups: 15,
            alwaysIncludePattern: true,
            pattern: 'yyyy-MM-dd.log'
        },
        error: {
            type: 'file',
            filename: path.join(__dirname, '../../logs/error'),
            maxLogSize: 100 * 1024 * 1024,
            backups: 15,
            alwaysIncludePattern: true,
            pattern: 'yyyy-MM-dd.log'
        },
        console: {
            type: 'console'
        },
    },
    categories: {
        error: { appenders: [ 'error', 'console',  ], level: 'error' },
        default: { appenders: [ 'server', 'console',  ], level: 'info' },
    },
});

const errorLogger = log4js.getLogger('error');
const infoLogger = log4js.getLogger('default');

// 使用log4js打印日志
function formatLog (msg, data?: Record<string, any>) {
    const log = [ `msg=${msg}` ];
    for (let key in data) {
        const keyText = typeof data[key] === 'object'
            ? JSON.stringify(data[key])
            : data[key];
        log.push(`${key}=${keyText}`);
    }
    return log.join('||');
}

export default {
    info (msg: string, data?: Record<string, any>) {
        const log = formatLog(msg, data);
        infoLogger.info(log);
    },
    error (msg: string, error?: Error, data: Record<string, any> = {}) {
        let errormsg = data.errormsg = error?.message || '无';
        let errstack = data.errstack = error?.stack? error.stack.replace(/\s+/g, ' ') : '无';
        
        const log = formatLog(msg, data);
        errorLogger.error(log);

        // 发送报警消息
        alarm.feishu({
            msg_type: 'interactive',
            card: JSON.stringify({
                type: 'template',
                data: {
                    template_id: 'ctp_AArfYGLoIN1K',
                    template_variable: {
                        system: '自动化部署构建服务',
                        msg,
                        errormsg,
                        errstack,
                        log,
                    },
                },
            }),
        });
    },
};
