const KoaRouter = require('koa-router');
const router = new KoaRouter();

const hello = require('./routes/hello');
const hello2 = require('./routes/hello2');
const index = require('./routes/index');
const organizations = require('./routes/organizations');


router.use('/', index.routes());
router.use('/hello', hello.routes());
router.use('/organizations', organizations.routes());

module.exports = router;
