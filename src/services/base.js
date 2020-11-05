exports.index = async (ctx) => {
    ctx.protobuf({ test: ctx.request.body.test });
};

exports.error = async (ctx) => {
    throw new Error('test error');
};
