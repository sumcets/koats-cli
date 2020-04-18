const app:Object = {
    //运行环境
    env:'dev', //编译的时候改为prod

    host: 'localhost', //编译时改为域名

    //数据库配置
    database:{
        dbName:'blog',
        host: 'www.xxxxx.com',
        port: 3306,
        user: 'blog',
        password: 'DNi3s66Mn2aye7DN',
    },

    //jwt配置
    jwt:{
        jwtSecret: 'fgadfa*&$%%$%$87542',
        tokenExpiresTime: 24 * 60 * 60, //单位：s
        autoExpire: true //token过期是否自动续期
    },

    wx: {
        appID: 'wx9e3b8ed2a996aaec',
        appSecret: '7c1374adbec76218c55975e5220ae4a6',
        url: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    },

    //不需要校验token的路由
    noAuth: ['/v1/login', '/v1/create']
}

module.exports = app