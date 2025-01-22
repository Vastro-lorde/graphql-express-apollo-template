const JWT = require('jsonwebtoken');
const { JWT_ISSUER, JWT_AUDIENCE } = require('../secrets');

exports.auth = async (req, res, next) => {
    try {
        const cookieRaw = req?.cookies?.tokenData;
        const tokenData = JSON.parse(cookieRaw);
        
        //
        const token = tokenData? tokenData?.token : req?.header('Authorization')?.replace('Bearer ', '');
        const decoded = JWT.verify(token, secret, {
            issuer: JWT_ISSUER,
            audience: JWT_AUDIENCE,
        });
        
        if (!decoded) throw new Error("User not found");
        
        if(new Date(decoded?.exp) < new Date(Date.now())) throw new Error("Token expired");
        // if(new Date(tokenData?.expiresIn) < new Date(Date.now())) throw new Error("Token expired");

        req.user = decoded;
        next();
    } catch (error) {
        req.user = null;
    }
}

exports.protected = next => (root, args, context, info) => {
    if (!context.user) {
      throw new Error('Authentication required');
    }
    return next(root, args, context, info);
};