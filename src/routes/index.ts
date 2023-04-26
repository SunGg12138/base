import * as Router from 'koa-router';
import validate from '../middlewares/validate';
import * as validations from '../validations';
import * as config from 'config';

const router = new Router({ prefix: '/api' });

export default router;
