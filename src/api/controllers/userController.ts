import * as Router from 'koa-router';
import { Context } from 'koa';
import { Render } from '../../helper/call';
import * as db from '../../core/db';
const md5 = require('md5');

const router = new Router({
    prefix:'/v1'
});

/**
 * 用户登录
 */
router.post('/login', async (ctx:Context)=>{
    let postData = ctx.request.body;
    const code = postData.code; //微信返回的code
    const userInfo = postData.userInfo; //微信返回的用户信息
    let res = await db.User.getUserInfoWx(code, userInfo);
    if(res){
        ctx.renderData = res;
        throw new Render('成功', 200, true);
    }
    throw new Render('失败', 400, false);
});

module.exports = router;