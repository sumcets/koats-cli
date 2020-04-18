import { Context } from 'koa';
import { Render } from '../helper/call';

export const catchError = async (ctx:Context, next:any)=>{
    try {
        await next();
    } catch (error) {
        const isRenderError = error instanceof Render;
        if(!isRenderError && (global as any).configs.env === 'dev'){
            throw error
        }
        if(isRenderError){
            ctx.body = {
                msg: error.msg,
                success: error.success,
                data: ctx.renderData,
            }
            ctx.status = error.code;
        } else {
            ctx.body = {
                msg: '出错了～',
                success: 'false',
            }
            ctx.status = 500;
        }
    }
}