const jwt =require("jsonwebtoken");

const generateToke=(payload,isRefresToken)=>{
    if (isRefresToken){
        return jwt.sign(payload,process.env.SECRET_TOKEN_REFRESH,{
            expiresIn:"60min"
        });
    }
       return jwt.sign(payload,process.env.SECRET_TOKEN,{
            expiresIn:"5s"
        });
}

module.exports=generateToke