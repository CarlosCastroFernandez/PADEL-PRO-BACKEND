const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    const authToken = req.header("auth-token")

    if (!authToken) res.status(403).send("Acceso denegado");
    try {
        const payload = jwt.verify(authToken, process.env.SECRET_TOKEN);

        req.payload = payload;
        next();
    } catch (e) {
        try {
            const payload = jwt.verify(authToken, process.env.SECRET_TOKEN_REFRESH);

            req.payload = payload;
            next();
        } catch (error) {
            res.status(403).send({status:"EXPIRED"});
        }

    }

}

module.exports=verifyToken;
