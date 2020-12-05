const KoaRouter = require('koa-router');
const sendExampleEmail = require('../mailers/example');

const router = new KoaRouter();

router.get('hello2', '/', async (ctx) => {
  await ctx.render('hello2/index', {
    nameUrl: (name) => ctx.router.url('hello2.name', name),
    notice: ctx.flashMessage.notice,
  });
});

router.post('hello2', '/', async (ctx) => {
  ctx.flashMessage.notice = 'Form successfully processed';
  // this is just to show how to send an e-mail using a mailer helper fn
  // but it will never be executed
  if (Math.random() > 1) {
    await sendExampleEmail(ctx.request.body);
  }
  ctx.redirect(router.url('hello2'));
});

router.get('hello2.name', '/:name', (ctx) => {
  ctx.body = { message: `Hello2 ${ctx.params.name}!` };
});

module.exports = router;
