import * as Router from 'koa-router';

const router = new Router({});

router.get('/', async (ctx, next) => {
    await ctx.render('home', {
        title: '实用工具-快捷导出、快捷计算',
    });
});

export default router;
