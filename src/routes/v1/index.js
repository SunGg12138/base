const router = require('koa-router')({ prefix: '/api/v1/' });
const requireDir = require('require-dir')();

for (let key in requireDir) {
    router.use(key, requireDir[key]);
}

module.exports = router.routes();
