import { minify } from 'html-minifier';

export default async (ctx, next) => {
    await next();

    if (ctx.body && ctx.body.startsWith('<!DOCTYPE html>')) {
        ctx.body = minify(ctx.body, {
            collapseWhitespace: true,
            removeComments: true,
        });
    }
};
