const router = require('koa-router')();
const Service = require('../../services/base');

router.post('/', Service.index);
router.post('/error', Service.error);

module.exports = router.routes();
