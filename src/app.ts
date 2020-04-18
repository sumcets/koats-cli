import  * as Koa from 'koa';
import * as parser from 'koa-bodyparser';
const Init = require('./core/init')
import { catchError } from './middleware/render';
import { auth } from './middleware/auth';
const app = new Koa();
const configs = require('./configs/index')

app.use(catchError);
app.use(parser());
app.use(auth);

new Init(app);

app.listen(configs.env === 'prod' ? 8081 : 3000, configs.host);