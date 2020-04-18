import { Context } from "koa";

export class Render extends Error {

    private msg:string;
    private code:number;
    private success:boolean;

    constructor(msg:string, code:number, success:boolean){
        super();
        this.msg = msg;
        this.code = code;
        this.success = success;
    }
}
