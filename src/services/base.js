exports.index = async (ctx) => {
    ctx.setBody({ test: ctx.request.body.test });
};

exports.error = async (ctx) => {
    throw new Error('test error');
};
