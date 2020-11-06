const router = require('koa-router')();
const Service = require('../../services/base');

router.get('/', Service.index);
router.get('/error', Service.error);

module.exports = router.routes();
