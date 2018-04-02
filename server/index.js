const Koa = require('koa');
const ejs = require('ejs');
const pug = require('pug');
const { htmlTpl, ejsTpl, pugTpl } = require('./tpl')

const app = new Koa();

app.use(async (ctx, next) => {
  ctx.type = 'text/html; charset=utf-8';
  ctx.body = pug.render(pugTpl, {
    you: 'world',
    me: 'alterman',
    content: 'this is test static html page',
  });
});

app.listen(3333);
