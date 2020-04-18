import { Sequelize } from 'sequelize-typescript';
const configs = require('../configs/index');
import BaseModel from '../api/models/baseModel';
import User from '../api/models/User';

const rootPath = configs.env === 'dev' ? `${ process.cwd() }/src` : `${ process.cwd() }`

const { dbName, host, port, user, password } = configs.database;

const sequelize = new Sequelize(dbName, user, password, {
    dialect:'mysql',
    host,
    port,
    logging: false,
    timezone: '+8:00'
})

sequelize.addModels( [ rootPath + '/api/models' ] );

export { sequelize, BaseModel, User, Note, Img, Share }

