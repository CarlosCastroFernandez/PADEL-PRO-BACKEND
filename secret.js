const crypto=require("crypto");

const secret="Full stack 18";
let actualizo="mas seguridfad"
for (let i=0;i<2;i++){

    if(i==1) actualizo="mas seguridad aun";
    const hash=crypto.createHmac("sha256",secret).update(actualizo).digest("hex");
    console.log(hash);
    

}