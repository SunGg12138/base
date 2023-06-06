import * as moment from 'moment-timezone';

const d = new Date('2023-06-02 00:00 +0800');

console.log(moment(d).format('YYYY-MM-DD HH:mm:ss'))
