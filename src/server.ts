import * as config from 'config';
import app from './app';

// 打印出关键env
console.log('env:', {
    NODE_ENV: process.env.NODE_ENV,
    HTTP_PORT: process.env.HTTP_PORT,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_PWD: process.env.REDIS_PWD,
});

const PORT = process.env.HTTP_PORT || config.get('port');

app.listen(PORT, function () {
    console.log('server success run at', PORT);
});
