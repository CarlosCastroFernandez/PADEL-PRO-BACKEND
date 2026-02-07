const jwt =require("jsonwebtoken");

const generateToke=(payload,isRefresToken)=>{
    if (isRefresToken){
        return jwt.sign(payload,process.env.SECRET_TOKEN_REFRESH,{
            expiresIn:"1min"
        });
    }
       return jwt.sign(payload,process.env.SECRET_TOKEN,{
            expiresIn:"1min"
        });
}

module.exports=generateToke