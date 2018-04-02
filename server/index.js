const Koa = require('koa');
const views = require('koa-views');
const { resolve } = require('path');

const app = new Koa();

app.use(views(resolve(__dirname, './views'),{
  extension: 'pug',
}));

app.use(async (ctx, next) => {
  await ctx.render('index', {
    you: 'world',
    me: 'alterman',
    content: '测试pug模板引擎中间件',
  })
});

app.listen(3333);
