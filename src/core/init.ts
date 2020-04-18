import * as Router from 'koa-router';
import * as Koa from 'koa';
const requireDirectory = require('../helper/requireDirectory');
const configs = require('../configs/index');
const rootPath = configs.env === 'dev' ? `${ process.cwd() }/src` : `${ process.cwd() }`;

class InitManager {
    private app:Koa;
    constructor(app:Koa){
        this.app = app;
        this.loadRouters();
        this.loadConfig();
    }
    /**
     * 自动加载路由
     */
    private loadRouters():void{
        const apiDirectory: string = `${ rootPath }/api`;
        const whenLoadModule = (obj:any) => {
            if(obj instanceof Router){
                this.app.use(obj.routes());
            }
        }
        requireDirectory(module, apiDirectory, {visit: whenLoadModule});
    }
    /**
     * 加载配置文件
     */
    private loadConfig():void{
        const configPath:string = `${ rootPath }/configs/index`;
        const config = require(configPath);
        (global as any).configs = config 
    }
}

module.exports = InitManager;