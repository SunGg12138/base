# koa-sequelize 基础项目

koa + sequelize + mysql

## 项目结构

```
- config // 应用配置文件夹
- src/
    - bin // 可执行文件夹
        - www // 启动文件
    - middlewares // 中间件文件夹
        - catchError // 捕捉错误中间件
        - visit // 访问中间件
    - models // 数据库管理模块
    - routes // 路由文件夹
        - v1 // v1版本路由文件夹
    - test // 测试文件夹
    - app.js // 应用入口文件
```