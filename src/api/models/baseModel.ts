import {Table, Column, Model} from 'sequelize-typescript';

@Table({
    tableName:'base_table',
    timestamps: false
})
export default class BaseModel extends Model<BaseModel> {
    @Column({
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    [Index:string]: any;

    /**
     * 
     * @param item 
     */
    static async createItem<T extends BaseModel>(item:T){
        return await this.create(item)
    }

    static async getList<T extends BaseModel>(item:Array<any>=[]){
        if(item.length) {
            return await this.findAll({
                raw: true,
                attributes: item
            })
        }
        return await this.findAll({
            raw: true
        })
    }

}