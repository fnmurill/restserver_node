const jwt = require('jsonwebtoken');

/**
 * Verificar Token
 */

let checkToken = (req, res, next) => {

    let token = req.get('token'); //authorization

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no Válido'
                }
            });
        }
        req.user = decoded.user;
        next();
    });
};

/**
 * Verificar Role
 */

let checkAdminRole = (req, res, next) => {

    let user = req.user;

    if (user.role === 'ADMIN') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'Rol de usuario no válido'
            }
        });
    }

}


module.exports = {
    checkToken,
    checkAdminRole
}