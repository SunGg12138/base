exports.index = async (ctx) => {
    ctx.body = { test: ctx.request.body.test };
};

exports.error = async (ctx) => {
    throw new Error('test error');
};
