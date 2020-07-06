const Sequelize = require('sequelize');
const requireDir = require('require-dir')();

//方法1:单独传递参数
const sequelize = new Sequelize('koa-sequelize', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql'
});

exports.sequelize = sequelize;
for (let key in requireDir) {
    exports[key] = sequelize.define(key, requireDir[key].attributes, requireDir[key].options);
}

// (async () => {
    // await sequelize.sync();
    // let user = await exports.users.create({
    //     nick_name: 'sungg',
    //     login_name: 'sungg',
    //     password: '123456'
    // });
    // console.log(user.toJSON());
// })();