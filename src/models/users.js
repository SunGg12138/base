const DataTypes = require('sequelize').DataTypes;

exports.attributes = {
    nick_name: { type: DataTypes.STRING(50), allowNull: false, commment: '用户昵称' },
    login_name: { type: DataTypes.STRING(50), allowNull: false, commment: '用户登录名' },
    password: { type: DataTypes.STRING(50), allowNull: false, commment: '用户登录密码' },
};

exports.options = {};