import { Table, Column, IsNull } from 'sequelize-typescript';
import BaseModel from '../models/baseModel';
const util = require('util');
const axios = require('axios');
import { getToken } from '../../helper/jwt';


@Table({
    tableName:'user'
})
export default class User extends BaseModel {
    @Column
    nickName: string;

    @Column
    gender: string;

    @Column
    avatarUrl: string;

    @Column
    city:string;

    @Column
    country:string

    @Column
    province:string;

    @Column
    openId: string;

    @Column
    token: string;

    /**
     * 
     * @param code 微信返回code
     * @param userInfo 微信返回的用户信息
     */
    static async getUserInfoWx(code:string, userInfo:any={}){
        let status = true;
        if(!code){
            return !status;
        }
        let { appID, appSecret,  url} = (global as any).configs.wx;
        url = util.format(url, appID, appSecret, code);
        const res = await axios.get(url);
        if(res.status !== 200 || (res.data && !res.data.openid)){
            return !status;
        }
        const wxData = res.data;
        const user = await this.findOne({
            where:{
                openId: wxData.openid
            }
        });
        //存在user直接返回用户信息
        if(user){
            const payload = {
                name: user.openId,
                id: user.id
            };
            const token = getToken(payload);
            user.token = token;
            user.avatarUrl = userInfo.avatarUrl;
            user.gender = userInfo.gender;
            user.nickName = userInfo.nickName;
            user.province = userInfo.province;
            user.city = userInfo.city;
            user.country = userInfo.country;
            user.save();
            return user;
        }
        //新建用户
        const newUser =  await this.createItem({
            openId: wxData.openid,
        } as any);
        if(newUser){
            const payload = {
                name: newUser.openId,
                id: newUser.id
            };
            const token = getToken(payload);
            newUser.token = token;
            newUser.avatarUrl = userInfo.avatarUrl;
            newUser.gender = userInfo.gender;
            newUser.nickName = userInfo.nickName;
            newUser.province = userInfo.province;
            newUser.city = userInfo.city;
            newUser.country = userInfo.country;
            newUser.save();
            return newUser;
        }
        return !status;
    }
}