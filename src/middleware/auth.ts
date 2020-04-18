import { Context } from "vm";
import { Render } from '../helper/call'
import { getToken } from '../helper/jwt';
import * as db from '../core/db';
const jwt = require('jsonwebtoken');

export const auth = async (ctx:Context, next:any)=>{
    let path = ctx.request.path;
    let noAuthList = (global as any).configs.noAuth;
    if(noAuthList.includes(path)){
        await next();
    }
    let token = ctx.header.authorization;
    const jwtconfigs = (global as any).configs.jwt;
    if(token){
        try {
            const res = await jwt.verify(token.split(' ')[1], jwtconfigs.jwtSecret);   
            ctx.jwtRes = res;
        } catch (error) {
            const autoExpire = jwtconfigs.autoExpire;
            //如果不自动续期则返回401
            if(!autoExpire) throw new Render('Unauthorized', 401, false);
            //如果不是token过期的错误则返回401
            if(!(error instanceof jwt.TokenExpiredError)){
                ctx.renderData = {message: 'token过期'};
                throw new Render('Unauthorized', 401, false);
            } 
            const expireData = jwt.decode(token.split(' ')[1]);
            const {name, id} = expireData;
            let _token = await db.User.findByPk(id);
            //如果数据库中的token发生变化则返回401
            if(_token.token !== token.split(' ')[1]){
                ctx.renderData = {message: '账号在其他地方登录'};
                throw new Render('Unauthorized', 401, false);
            } 
            token = getToken({name:name, id:id});
            //将最新token保存到数据库
            _token.token = token;
            _token.save();
            ctx.jwtRes = Object.assign(expireData, {renew: true});
            //将重新生成的token发送给前端
            ctx.res.setHeader('Authorization', token)
        }
        await next();         
    }else{
        throw new Render('Unauthorized without token', 401, false);
    }
};