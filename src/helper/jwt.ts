const jwt = require('jsonwebtoken');

export function getToken(payload:Object){
    let jwtData = (global as any).configs.jwt;
    let { tokenExpiresTime, jwtSecret } = jwtData;
    let token =  jwt.sign(payload, jwtSecret, {expiresIn: tokenExpiresTime})
    return token;
}

