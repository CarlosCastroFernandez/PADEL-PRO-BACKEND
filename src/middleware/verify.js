const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    const authToken = req.header("auth-token")

    if (!authToken)  res.status(403).json({status:"EXPIRED"});
    console.log("paso")
    try {
        const payload = jwt.verify(authToken, process.env.SECRET_TOKEN);

        req.payload = payload;
        next();
    } catch (e) {
        try {
            const payload = jwt.verify(authToken, process.env.SECRET_TOKEN_REFRESH);

            req.payload = payload;
            console.log("PASO "+req.payload)
            next();
        } catch (error) {
            console.log("aqi le")
            res.status(403).json({status:"EXPIRED"});
        }

    }

}

module.exports=verifyToken;
